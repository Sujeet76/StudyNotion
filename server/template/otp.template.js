const otp_temp = (otp) => {
  let result = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
  >
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    </head>
    <body style='font-family: "Poppins", sans-serif;'>
      <div style="margin: 0; padding: 0; text-align: center">
        <table
          style="width: 100%; max-width: 600px; margin: 0 auto; padding: 10px"
        >
          <tr
            style="
              display: inline-table;
              background-color: #ffd60a;
              border-radius: 10px;
            "
          >
            <td style="padding: 10px">
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background-color: #141414;
                  color: #ffd60a;
                  border-radius: 50%;
                  height: 50px;
                  width: 50px;
                  font-size: 2.5rem;
                "
              >
                S
              </div>
            </td>
            <td
              style="
                padding: 10px;
                font-size: 2rem;
                font-weight: 700;
                color: #141414;
              "
            >
              StudyNotion
            </td>
          </tr>
        </table>
        <table
          style="width: 100%; max-width: 600px; margin: 0 auto; padding: 10px"
        >
          <tr>
            <td style="padding: 10px">
              <h3
                style="
                  margin: 0;
                  font-size: 1.45rem;
                  font-weight: 600;
                  color: #141414;
                "
              >
                OTP verification Email
              </h3>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px">
              <p
                style="
                  margin: 0;
                  font-size: 1.3rem;
                  color: #181717;
                  font-weight: 500;
                "
              >
                Dear User
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px">
              <p style="margin: 0; font-size: 1rem; color: #2b2828">
                Thank you for registering with StudyNotion. To complete your
                registration, please use the following OTP (one-time password) to
                verify your account:
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px">
              <p style="margin: 0; font-size: 1.5rem; font-weight: 600">${otp}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px">
              <p style="margin: 0; font-size: 1rem; color: #2b2828">
                This OTP is valid for 5 minutes. If you did not request this
                verification, please disregard this email. Once your account is
                verified, you will have access to our platform and its features.
              </p>
            </td>
          </tr>
        </table>
      </div>
    </body>
  </html>
  
  `;
  return result;
};

export default otp_temp;
