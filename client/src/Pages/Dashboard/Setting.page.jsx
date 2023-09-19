import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleLeft } from "react-icons/fa";
import { PiUploadSimpleBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

import deleteSvg from "../../assets/delete.svg";

import {
  ButtonDashboard,
  ConfirmationModal,
  ContainerDashboard,
  FormRowComponent,
  ImageComponent,
  PersonalInfoFormComponent,
} from "../../Components/";
import {
  changePassword,
  deleteUser,
} from "../../services/Operation/SettingApi";
import { AnimatePresence } from "framer-motion";

const initialState = {
  currentPassword: "",
  newPassword: "",
};

const SettingPage = () => {
  const { isLoading: profileLoading } = useSelector((store) => store.profile);
  const { isLoading: authLoading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [eye, setEye] = useState(false);
  const [eye2, setEye2] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const collectFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword } = formData;
    dispatch(changePassword(currentPassword, newPassword, token));
    setFormData(initialState);
  };

  const deleteHandler = () => {
    dispatch(deleteUser(token, navigate));
  };

  return (
    <main className="flex-1 bg-richblack-900 pb-[94px]">
      <div className="w-11/12 mx-auto">
        {/* heading */}
        <div className="mt-6">
          <button
            className="text-richblack-300 text-sm flex justify-center items-center gap-1 mb-3"
            onClick={() => navigate(-1)}
          >
            <FaAngleLeft />
            Back
          </button>
          <h1 className="text-3xl font-medium capitalize text-richblack-5 mb-14">
            Edit profile
          </h1>
        </div>
        <div className="flex flex-col gap-10">
          <ImageComponent />
          <PersonalInfoFormComponent />

          <div>
            <ContainerDashboard>
              <h2 className="text-lg font-semibold text-richblack-5 mb-5">
                Password
              </h2>
              <form
                onSubmit={submitHandler}
                className="flex lg:flex-row flex-col gap-5"
                id="update-password"
              >
                <FormRowComponent
                  text={"Current Password"}
                  type={"password"}
                  name="currentPassword"
                  value={formData.currentPassword}
                  handler={collectFormData}
                  placeholder={"Enter your current password"}
                  passwordEyeHandler={setEye2}
                  passwordEye={eye2}
                />
                <div className="w-full">
                  <FormRowComponent
                    text={"New Password"}
                    type={"password"}
                    name="newPassword"
                    value={formData.newPassword}
                    handler={collectFormData}
                    placeholder={"Enter your new password"}
                    passwordEyeHandler={setEye}
                    passwordEye={eye}
                  />
                </div>
              </form>
            </ContainerDashboard>
            <div className="flex gap-5 justify-end mt-8">
              <ButtonDashboard
                clickHandler={() => navigate("/dashboard/my-profile")}
                isDisabled={profileLoading || authLoading}
              >
                Cancel
              </ButtonDashboard>
              <ButtonDashboard
                typeBtn="submit"
                formId={"update-password"}
                isActive="true"
                isDisabled={profileLoading || authLoading}
              >
                Update
              </ButtonDashboard>
            </div>
          </div>

          <div className="bg-pink-900  border border-pink-600 rounded-lg p-8 px-12 w-full flex flex-col gap-5 text-start">
            {/* delete icon and message */}
            <div className="flex gap-4 items-center">
              <img src={deleteSvg} alt={"delete icon"} className="self-start" />
              <h4 className="text-lg font-bold text-pink-5 mb-2">
                Delete Account
              </h4>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-pink-25 mb-[2px]">
                Would you like to delete account?
              </p>
              <p className="text-sm font-medium text-pink-25 lg:w-[90%]">
                This account contains Paid Courses. Deleting your account will
                remove all the contain associated with it.
              </p>
              <button
                className="text-base text-pink-300 font-medium italic text-start hover:scale-110 mt-2"
                disabled={profileLoading || authLoading}
                onClick={() => {
                  setConfirmationModal({
                    text1: "Do you want to delete this account ?",
                    text2:
                      "All the data related to this account will be deleted",
                    btn1Text: "Delete",
                    btn2Text: "Cancel",
                    btn1Handler: deleteHandler,
                    btn2Handler: () => setConfirmationModal(null),
                  });
                }}
              >
                I want to delete my account.
              </button>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {confirmationModal && (
          <ConfirmationModal modalData={confirmationModal} />
        )}
      </AnimatePresence>
    </main>
  );
};

export default SettingPage;
