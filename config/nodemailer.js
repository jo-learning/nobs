import nodemailer from 'nodemailer';

export default async function NodeMailer({to, subject, text}) {
    // const { to, subject, text } = req.body;

    // Step 1: Create a Nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail', // You can use any email service provider
      auth: {
        user: process.env.EMAIL_USER, // Your email address (e.g., Gmail)
        pass: process.env.EMAIL_PASS, // Your email password (or app password for Gmail)
      },
    });

    try {
      // Step 2: Send email
      await transporter.sendMail({
        from: process.env.EMAIL_USER, // Sender email address
        to, // Recipient email address (from the request)
        subject, // Email subject
        text, // Email text content
      });

      
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}
