import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our app! We're very excited to have you on board.",
      action: {
        instructions: "To verify your email, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Verify your Email",
          link: verificationUrl,
        },
      },

      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our app! Here's your password recovery verification",
      action: {
        instructions: "To reset your password, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Reset your password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task manager",
      link: "https://taskmanagerlink.com",
    },
  });

  const emailTexual = mailGenerator.generatePlaintext(options.mailgenContent); // CREATES PLAIN  EMAIL
  const emailHtml = mailGenerator.generate(options.mailgenContent); // CREATES HTML EMAIL WITH PROPER UI

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const email = {
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: "options.subject",
    text: emailTexual,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(email);
  } catch (error) {
    console.error(
      "Email service failed silently, make sure you have provided your MAILTRAP credentials in the .env file.",
    );
    console.error("Error: ", error);
  }
};

export {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendEmail,
};
