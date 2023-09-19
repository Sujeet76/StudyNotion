import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PiUploadSimpleBold } from "react-icons/pi";

import { ButtonDashboard, ContainerDashboard } from "../../";

import { updateProfileImg } from "../../../services/Operation/SettingApi";

const ImageComponent = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { token, isLoading: authLoading } = useSelector((store) => store.auth);
  const { user, isLoading: profileLoading } = useSelector(
    (store) => store.profile
  );
  const [profileImg, setProfileImg] = useState(null);
  const [imgData, setImgData] = useState(null);

  const imgHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      setImgData(file);
      reader.onload = () => {
        setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImg = () => {
    const formData = new FormData();
    formData.append("displayPicture", imgData);
    dispatch(updateProfileImg(formData, token, navigate));
  };

  return (
    <ContainerDashboard>
      <div className="flex lg:gap-5 gap-3 items-center">
        {/* profile img */}
        <img
          src={profileImg || user?.img}
          alt={user?.name}
          className="lg:w-[4.5rem] lg:h-[4.5rem] md:w-[4.5rem] md:h-[4.5rem] h-[3.5rem] w-[3.5rem] aspect-square object-cover rounded-full"
        />
        {/* button */}
        <div>
          <p className="font-base font-[500] capitalize mb-3 text-richblack-25">
            Change Profile Picture
          </p>
          <div className="flex lg:flex-row md:flex-row items-center lg:md:gap-3 gap-1">
            <input
              type="file"
              name="profile"
              id="img"
              onChange={imgHandler}
              className="hidden"
            />
            <ButtonDashboard
              clickHandler={() => document.getElementById("img").click()}
              // className="p-2 py-1"
              isDisabled={authLoading || profileLoading}
            >
              Select
            </ButtonDashboard>
            <ButtonDashboard
              clickHandler={uploadImg}
              isActive={true}
              isDisabled={authLoading || profileLoading}
              // className="p-2 py-1"
            >
              <span className="flex items-center gap-1 text-sm">
                Upload
                <PiUploadSimpleBold />
              </span>
            </ButtonDashboard>
          </div>
        </div>
      </div>
    </ContainerDashboard>
  );
};

export default ImageComponent;
