const nodemailer = require("nodemailer");
const pug = require("pug");
module.exports = class Email {
  constructor(user, url) {
    this.to = user.to;
    this.from = user.from;
    this.username = user.username;
    this.url = url;
    if (user.message) {
      this.message = user.message;
    }
  }
  newTransport() {
    if (process.env.NODE_ENV === "production") {
      return;
    } else {
      return nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_EMAIL,
          pass: process.env.GMAIL_PASSWORD,
        },
      });
    }
  }
  async sendWelcome() {
    await this.send("welcome", "Dobrodosli na TechMern");
  }
  async contactAdmin() {
    await this.send("support", "Poruka pretplatnika");
  }
  async send(template, subject) {
    const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
      username: this.username,
      message: this.message,
    });
    const mailOptions = {
      to: this.to,
      from: this.from,
      subject,
      html,
    };
    await this.newTransport().sendMail(mailOptions);
  }
};
