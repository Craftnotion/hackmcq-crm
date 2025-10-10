module.exports = ({ env }) => ({
   upload: {
    config: {
      provider: 'local',
      providerOptions: {
        sizeLimit: 250 * 1024 * 1024, // 256mb in bytes
      },
    },
  },
  email: {
    config: {
      provider: '@strapi/provider-email-nodemailer',
      providerOptions: {
        host: env('EMAIL_HOST'),   
        port: env.int('EMAIL_PORT', 587),
        secure: false,
        auth: {
          user: env("MAILTRAP_USER"),      
          pass: env("MAILTRAP_PASS"),       
        }, 
      },
      settings: {
        defaultFrom: env("EMAIL_FROM", "noreply@mailtrap.io"),
        defaultReplyTo: env("EMAIL_TO", "noreply@mailtrap.io"),
      },
    },
  },
});
 
