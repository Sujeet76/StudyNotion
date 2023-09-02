import { useSelector } from "react-redux";

import { EditIcon } from "../../../data/Icon.data";
import { ContainerDashboard, ButtonDashboard } from "../../";

import NameLabel from "./NameLabel";
import { useNavigate } from "react-router-dom";

const PersonalDetails = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.profile);
  return (
    <ContainerDashboard className="flex flex-col gap-y-10">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold text-richblack-5">
          Personal Details
        </h4>
        <ButtonDashboard
          isActive={true}
          // className="ml-auto"
          clickHandler={() => navigate("/dashboard/setting")}
        >
          <EditIcon />
          Edit
        </ButtonDashboard>
      </div>
      <div className="max-w-[500px] flex justify-between">
        <div className="flex gap-5 flex-col">
          <NameLabel
            label={"First Name"}
            content={user?.name.split(" ")[0] ?? "Update your profile"}
          />
          <NameLabel
            label={"Email"}
            content={user?.email ?? "Update your profile"}
          />
          <NameLabel label={"Gender"} content={user?.additionDetails?.gender ?? "Add gender"} />
        </div>
        <div className="flex gap-5 flex-col">
          <NameLabel
            label={"Last Name"}
            content={user?.name.split(" ").at(-1) ?? "Update your profile"}
          />
          <NameLabel
            label={"Phone Number"}
            content={user?.additionDetails?.contactNumber ?? "Add phone number"}
          />
          <NameLabel
            label={"Date of Birth"}
            content={user?.additionDetails?.dateOfBirth ?? "Add date of birth"}
          />
        </div>
      </div>
    </ContainerDashboard>
  );
};

export default PersonalDetails;
