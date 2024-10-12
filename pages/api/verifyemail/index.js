import dns from 'dns';
import { promisify } from 'util';

// Convert dns.resolveMx to a promise for cleaner code
const resolveMx = promisify(dns.resolveMx);

// Optional: Perform an SMTP check (simulated here for simplicity)
const smtpCheck = async (domain, email) => {
  // Real SMTP verification would require an external package and SMTP server handling.
  // Here, we're just simulating the check.
  const fakeSmtpResponse = Math.random() > 0.5; // Simulate success/failure randomly
  return fakeSmtpResponse;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  const domain = email.split('@')[1];

  try {
    // Step 1: Check MX records
    const mxRecords = await resolveMx(domain);

    if (!mxRecords || mxRecords.length === 0) {
      return res.status(400).json({ success: false, message: 'No MX records found' });
    }

    // Step 2: Optionally, check the email via SMTP (simulated here)
    const smtpResult = await smtpCheck(domain, email);

    if (!smtpResult) {
      return res.status(400).json({ success: false, message: 'SMTP check failed' });
    }

    // If both checks pass, the email is likely valid
    return res.status(200).json({ success: true, message: 'Email is valid' });

  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
}
