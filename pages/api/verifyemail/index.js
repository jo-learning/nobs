import dns from 'dns';
import { promisify } from 'util';
import { SMTPClient } from 'smtp-client';

// Convert dns.resolveMx to a promise for cleaner code
const resolveMx = promisify(dns.resolveMx);

const smtpCheck = async (email) => {
  const domain = email.split('@')[1];

  try {
    // Step 1: Get MX records for the domain
    const mxRecords = await resolveMx(domain);
    
    if (!mxRecords || mxRecords.length === 0) {
      throw new Error('No MX records found');
    }

    // Sort MX records by priority
    mxRecords.sort((a, b) => a.priority - b.priority);

    const mxHost = mxRecords[0].exchange;

    // Step 2: Perform SMTP handshake
    const client = new SMTPClient({
      host: mxHost,
      port: 25,
      secure: false, // Most servers respond on port 25 without SSL
    });

    await client.connect();

    // Initiate handshake
    await client.greet({ hostname: 'localhost' }); // Use your server hostname

    await client.mail({ from: 'test@domain.com' }); // Use a test sender email
    await client.rcpt({ to: email }); // The email address to verify

    // If no error, the email is valid
    await client.quit();

    return { success: true, message: 'Email is valid' };

  } catch (err) {
    if (err.code === 'EENVELOPE') {
      // This error happens when the recipient is not accepted
      return { success: false, message: 'Email address is invalid' };
    } else {
      console.error('SMTP Error:', err.message);
      return { success: false, message: 'SMTP verification failed', error: err.message };
    }
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  try {
    // Perform SMTP check
    const smtpResult = await smtpCheck(email);

    if (!smtpResult.success) {
      return res.status(400).json({ success: false, message: smtpResult.message });
    }

    return res.status(200).json({ success: true, message: smtpResult.message });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
}
