'use strict';

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try {
      await strapi
        .plugin('email')
        .service('email')
        .send({
          to: 'admin@yourdomain.com', // Change here to admin email
          from: 'noreply@yourdomain.com',
          subject: `📩 New Contact Message from ${result.name}`,
          text: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                NEW CONTACT MESSAGE RECEIVED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Contact Information:
   Name:    ${result.name}
   Email:   ${result.email}

📌 Subject:
   ${result.subject || 'No subject provided'}

💬 Message:
   ${result.message || 'No message provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Please review and reply to the user if needed.
          `,
          html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Message</title>
          </head>
          <body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#f8fafc;">
            <div style="max-width:600px;margin:20px auto;background:#ffffff;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.1);overflow:hidden;">
              
              <!-- Header -->
              <div style="background:linear-gradient(135deg,#1e3a8a 0%,#2563eb 100%);padding:30px;text-align:center;">
                <h1 style="color:#ffffff;margin:0;font-size:26px;">📬 New Contact Message</h1>
                <p style="color:#dbeafe;margin-top:10px;font-size:16px;">Someone reached out via your website</p>
              </div>

              <!-- Content -->
              <div style="padding:35px 30px;">
                
                <!-- Contact Info -->
                <h2 style="color:#111827;font-size:20px;margin-bottom:20px;border-bottom:2px solid #2563eb;padding-bottom:10px;">👤 Contact Details</h2>
                <table style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td style="padding:10px 0;font-weight:600;color:#374151;width:120px;">Name:</td>
                    <td style="padding:10px 0;color:#111827;font-size:16px;">${result.name}</td>
                  </tr>
                  <tr style="background:#f9fafb;">
                    <td style="padding:10px 0;font-weight:600;color:#374151;">Email:</td>
                    <td style="padding:10px 0;">
                      <a href="mailto:${result.email}" style="color:#2563eb;text-decoration:none;">${result.email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;font-weight:600;color:#374151;">Subject:</td>
                    <td style="padding:10px 0;color:#111827;font-size:16px;">
                      ${result.subject || '<em style="color:#6b7280;">Not provided</em>'}
                    </td>
                  </tr>
                </table>

                <!-- Message -->
                <h2 style="color:#111827;font-size:20px;margin-top:30px;margin-bottom:15px;border-bottom:2px solid #f59e0b;padding-bottom:10px;">💬 Message</h2>
                <div style="background-color:#f9fafb;padding:20px;border-radius:6px;border-left:4px solid #f59e0b;">
                  <p style="margin:0;line-height:1.6;color:#1f2937;font-size:15px;">
                    ${result.message || 'No message provided'}
                  </p>
                </div>

                <!-- Reply Button -->
                <div style="text-align:center;margin-top:35px;">
                  <a href="mailto:${result.email}" 
                     style="display:inline-block;background:linear-gradient(135deg,#1e3a8a 0%,#2563eb 100%);
                            color:#ffffff;padding:14px 28px;text-decoration:none;border-radius:6px;
                            font-weight:600;font-size:16px;box-shadow:0 3px 8px rgba(0,0,0,0.2);">
                    📧 Reply to ${result.name}
                  </a>
                </div>
              </div>

              <!-- Footer -->
              <div style="background-color:#111827;padding:15px;text-align:center;">
                <p style="margin:0;color:#9ca3af;font-size:13px;">
                  This email was automatically generated from your website’s contact form.
                </p>
                <p style="margin:5px 0 0 0;color:#6b7280;font-size:12px;">
                  © ${new Date().getFullYear()} Craftnotion - All rights reserved
                </p>
              </div>
            </div>
          </body>
          </html>
          `,
        });

      console.log('✅ Contact form notification email sent successfully');
    } catch (err) {
      console.error('❌ Email sending failed:', err);
    }
  },
};
