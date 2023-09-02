import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { EditIcon } from "../../../data/Icon.data";

import {
  ButtonDashboard,
  ContainerDashboard,
  RouteThoughClickComponent,
} from "../../";

const ProfileImageAndNameComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((store) => store.profile);

  return (
    <ContainerDashboard>
      <div className="flex gap-6 items-center w-full">
        {/* profile img */}
        <img
          src={user?.img}
          alt={user?.name}
          className="w-[4.5rem] h-[4.5rem] aspect-square object-cover rounded-full"
        />
        {/* button */}
        <div>
          <p className="font-lg font-semibold capitalize text-richblack-5 mb-1">
            {user?.name}
          </p>
          <p className="text-sm text-richblack-300">{user?.email}</p>
        </div>
        <ButtonDashboard
          isActive={true}
          className="ml-auto"
          clickHandler={() => navigate("/dashboard/setting")}
        >
          <EditIcon />
          Edit
        </ButtonDashboard>
      </div>
    </ContainerDashboard>
  );
};

export default ProfileImageAndNameComponent;
