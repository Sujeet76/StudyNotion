import { useEffect } from "react";
import {
  EmailVerificationForm,
  GenericContainerComponent,
} from "../../Components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EmailVerificationPage = () => {
  const navigate = useNavigate();
  const { signupData } = useSelector((store) => store.auth);
  useEffect(() => {
    if (!signupData) {
      return navigate("/signup");
    }
  }, []);

  return (
    <GenericContainerComponent
      heading={"Verify Email"}
      subheading={
        "A verification code has been sent to you. Enter the code below"
      }
    >
      {<EmailVerificationForm />}
    </GenericContainerComponent>
  );
};

export default EmailVerificationPage;
