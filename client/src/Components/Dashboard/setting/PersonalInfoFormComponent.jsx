import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import countryCodes from "../../../data/countrycode.json";

import { FormRowComponent, ContainerDashboard, ButtonDashboard } from "../..";
import { updateProfileData } from "../../../services/Operation/SettingApi";

const PersonalInfoFormComponent = () => {
  const { user, isLoading: profileLoading } = useSelector(
    (store) => store.profile
  );
  const { token, isLoading: authLoading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: user?.name,
    address: user?.additionDetails?.address,
    dateOfBirth: user?.additionDetails?.dateOfBirth,
    gender: user?.additionDetails?.gender ?? "male",
    contactNumber: user?.additionDetails?.contactNumber,
    about: user?.additionDetails?.about,
    countryCode: "+91",
  });
  const collectFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    delete formData.countryCode;
    dispatch(updateProfileData({ ...formData, token }));
  };

  return (
    <div>
      <ContainerDashboard>
        <form onSubmit={submitHandler} id="profile-form">
          <h5 className="text-richblack-5 font-semibold text-lg mb-5">
            Profile Information
          </h5>
          {/* form files */}
          <div className="flex flex-col gap-5">
            {/* name and profession */}
            <div className="flex gap-6">
              <FormRowComponent
                text="Display Name"
                type="text"
                name={"name"}
                value={formData.name}
                handler={collectFormData}
                placeholder={user?.name}
                isRequired={false}
              />
              <FormRowComponent
                text="Address"
                type="text"
                name={"address"}
                value={formData.address}
                handler={collectFormData}
                placeholder={user?.address ?? "Enter address"}
                isRequired={false}
              />
            </div>
            {/* date of birth and gender */}
            <div className="flex gap-6">
              {/* date of birth */}
              <FormRowComponent
                text="Date Of Birth"
                type="date"
                name={"dateOfBirth"}
                value={formData.dateOfBirth}
                handler={collectFormData}
                placeholder={"dd/mm/yyyy"}
                isRequired={false}
              />
              {/* gender */}
              <div className="relative w-full">
                {/* heading -> gender */}
                <p className="text-sm font-normal text-richblack-25 relative mb-[6px]">
                  Gender
                  <sup className="text-pink-200 absolute text-[22px] top-[10px] ml-[2px]">
                    *
                  </sup>
                </p>
                <div className="w-full h-12 rounded-[8px] p-[0.75rem] text-base text-richblack-25 shadow-form bg-richblack-700 focus:outline-none focus:ring focus:ring-richblack-700 flex gap-12">
                  {/* male */}
                  <label
                    htmlFor="male"
                    className="flex items-center gap-3 text-richblack-200 font-[500]"
                  >
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={collectFormData}
                    />
                    Male
                  </label>
                  {/* female */}
                  <label
                    htmlFor="female"
                    className="flex items-center gap-3 text-richblack-200 font-[500]"
                  >
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      onChange={collectFormData}
                      checked={formData.gender === "female"}
                    />
                    Female
                  </label>
                  {/* other */}
                  <label
                    htmlFor="other"
                    className="flex items-center gap-3 text-richblack-200 font-[500]"
                  >
                    <input
                      type="radio"
                      name="gender"
                      id="other"
                      value="other"
                      onChange={collectFormData}
                      checked={formData.gender === "other"}
                    />
                    Other
                  </label>
                </div>
              </div>
            </div>
            {/* phone number and about */}
            <div className="flex gap-6">
              {/* phone number */}
              <div className="flex lg:flex-row flex-col items-center w-full self-start">
                {/* country code */}
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
                      value={formData.countryCode}
                      onChange={collectFormData}
                      className="autofill:bg-richblack-700 w-[80px] h-12 rounded-[8px] text-center text-base text-richblack-25 shadow-form bg-richblack-700 focus:outline-none focus:ring focus:ring-richblack-600 pl-[16px]"
                    >
                      {countryCodes.map(({ country, code }) => (
                        <option
                          key={country}
                          value={code}
                        >{`${code} - ${country}`}</option>
                      ))}
                    </select>
                  </label>
                </div>
                {/* phone number */}
                <div className="mt-5 -ml-[18px] w-[calc(100%-80px)]">
                  <FormRowComponent
                    text={" "}
                    type={"number"}
                    name={"contactNumber"}
                    value={formData.contactNumber}
                    handler={collectFormData}
                    placeholder={"123 456 7891"}
                    isRequired={false}
                    max="10"
                  />
                </div>
              </div>
              {/* About */}
              <label htmlFor="about" className="w-full">
                <p className="text-sm font-normal text-richblack-25 relative mb-[6px]">
                  About
                </p>
                <textarea
                  id="about"
                  name="about"
                  value={formData.about}
                  onChange={collectFormData}
                  placeholder="Write something about yourself"
                  className="autofill:bg-richblack-700  w-full rounded-[8px] p-[0.75rem] text-base text-richblack-25 shadow-form bg-richblack-700 focus:outline-none focus:ring focus:ring-richblack-600 h-12"
                ></textarea>
              </label>
            </div>
          </div>
        </form>
      </ContainerDashboard>
      <div className="flex gap-5 justify-end mt-8">
        <ButtonDashboard
          isDisabled={profileLoading || authLoading}
          clickHandler={() => navigate("/dashboard/my-profile")}
        >
          Cancel
        </ButtonDashboard>
        <ButtonDashboard
          typeBtn="submit"
          formId={"profile-form"}
          isActive="true"
          isDisabled={profileLoading || authLoading}
        >
          save
        </ButtonDashboard>
      </div>
    </div>
  );
};

export default PersonalInfoFormComponent;
