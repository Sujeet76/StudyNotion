import otp_temp from "../template/otp.template.js";

import transporter from "../config/mailConfig.js";

const mailSender = async (email, title, body) => {
  try {
    let info = await transporter.sendMail(
      {
        from: "StudyNation || by sujeet kumar",
        to: `${email}`,
        subject: `${title}`,
        html: `${otp_temp(body)}`,
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
