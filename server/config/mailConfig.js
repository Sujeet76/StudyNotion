import nodemailer from "nodemailer";
import { MAIL_HOST, MAIL_PASS, MAIL_USER } from "./index.js";

// const transportMail = async (email, title, body) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.MAIL_HOST,
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//     });
//     return transporter;
//   } catch (error) {
//     console.log("Error while config node mailer", error.message);
//   }
// };
const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port:465,
  secure:true,
  debug: true,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

export default transporter;
