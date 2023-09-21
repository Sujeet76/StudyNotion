import nodemailer from "nodemailer";
import smtp from "nodemailer-smtp-transport";
import { MAIL_HOST, MAIL_PASS, MAIL_USER } from "../config/index.js";

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport(
      smtp({
        service: MAIL_HOST,
        auth: {
          user: MAIL_USER,
          pass: MAIL_PASS,
        },
      })
    );

    let info = await transporter.sendMail(
      {
        from: "StudyNation || by sujeet kumar",
        to: `${email}`,
        subject: `${title}`,
        html: body,
      },
      function (error) {
        if (error) {
          console.log("Error transporter : " + error);
        }
      }
    );
    return info;
  } catch (error) {
    console.log("Error in mailSender.js ", error.message);
  }
};

export default mailSender;
