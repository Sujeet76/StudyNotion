import { useState } from "react";
import uniqid from "uniqid";
import { toast } from "react-hot-toast";

import FormRowComponent from "./FormRow.component";

import countryCodes from "../../data/countrycode.json";
import { apiConnector } from "../../utils/axios";
import { contactusEndpoint } from "../../services/api";

let initialState = {
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "+91",
  phoneNum: "",
  message: "",
};

const ContactFormComponent = ({ classname }) => {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const sendMail = async () => {
    setIsLoading(true);
    let toastId = null;
    try {
      toastId = toast.loading("Validating, your data!!");
      const body = { ...formData };
      delete body.countryCode;
      delete body.phoneNum;
      body.phoneNumber = formData.phoneNum;
      const response = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        body
      );

      const { data } = response;
      const successMessage = data?.data?.message ?? "Email send successfully";

      toast.success(successMessage, {
        id: toastId,
      });
      setFormData(initialState);
      setIsLoading(false);
    } catch (err) {
      const { response } = err;
      console.log(response);
      console.error(err);
      const errorMessage =
        response?.data?.message ?? "Could not register your review";
      toast.error(errorMessage, {
        id: toastId,
      });
      setIsLoading(false);
      return;
    }
  };

  const collectFormData = (e) => {
    console.log("render");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    sendMail();
    console.log(formData);
  };

  return (
    <form
      onSubmit={submitHandler}
      className={`${classname} flex flex-col gap-5`}
    >
      <div className="flex lg:flex-row md:flex-row flex-col gap-5 w-full">
        <FormRowComponent
          text={"First Name"}
          type={"text"}
          name={"firstName"}
          value={formData.firstName}
          handler={collectFormData}
          placeholder={"Enter first name"}
        />
        <FormRowComponent
          text={"Last Name"}
          type={"text"}
          name={"lastName"}
          value={formData.lastName}
          handler={collectFormData}
          placeholder={"Enter last name"}
          isRequired={false}
        />
      </div>

      <FormRowComponent
        text={"Email Address"}
        type={"email"}
        name={"email"}
        value={formData.email}
        handler={collectFormData}
        placeholder={"Enter email address"}
      />

      <div className="flex flex-row items-center">
        <div>
          <p className="text-sm font-normal text-richblack-25 relative mb-[6px] w-[7rem]">
            Phone Number
            <sup className="text-pink-200 absolute text-[22px] top-[10px] ml-[2px]">
              *
            </sup>
          </p>
          <label htmlFor="countryCode">
            <select
              name="countryCode"
              id="countryCode"
              onChange={collectFormData}
              value={formData.countryCode}
              className="autofill:bg-richblack-700 w-[80px] h-12 rounded-[8px] text-center text-base text-richblack-25 shadow-form bg-richblack-700 focus:outline-none focus:ring focus:ring-richblack-600 pl-[14px]"
            >
              {countryCodes.map(({ country, code }) => (
                <option
                  value={code}
                  key={uniqid()}
                >{`${code} - ${country}`}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-[22px] -ml-5 w-[calc(100%-80px)]">
          <FormRowComponent
            // text={" "}
            type={"number"}
            name={"phoneNum"}
            value={formData.phoneNum}
            handler={collectFormData}
            placeholder={"123 456 7891"}
            isRequired={false}
          />
        </div>
      </div>

      <label htmlFor="message">
        <p className="text-sm font-normal text-richblack-25 relative mb-[6px]">
          Message
          <sup className="text-pink-200 absolute text-[22px] top-[10px] ml-[2px]">
            *
          </sup>
        </p>
        <textarea
          name="message"
          id="message"
          onChange={collectFormData}
          value={formData.message}
          placeholder="Write something"
          className="autofill:bg-richblack-700  w-full rounded-[8px] p-[0.75rem] text-base text-richblack-25 shadow-form bg-richblack-700 focus:outline-none focus:ring focus:ring-richblack-600 h-[124px]"
        ></textarea>
      </label>

      <button
        type="submit"
        className="mt-6 bg-yellow-50 text-richblack-900 w-full rounded-lg mx-auto p-3 font-[500] focus:outline-none focus:ring focus:ring-yellow-200 hover:scale-95 transition-all"
        disabled={isLoading}
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactFormComponent;
