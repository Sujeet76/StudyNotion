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
      <div className="w-max lg:flex flex-row-reverse">
        <div className="flex lg:gap-6 gap-4 items-center">
          <img
            src={user?.img}
            alt={user?.name}
            className="lg:w-[4.5rem] lg:h-[4.5rem] w-[3rem] h-[3rem] aspect-square object-cover rounded-full"
          />
          {/* button */}
          <div>
            <p className="font-lg flex lg:justify-between gap-3 items-center font-semibold capitalize text-richblack-5 mb-1">
              {user?.name}
              <button
                className="flex gap-2 items-center text-yellow-50"
                onClick={() => navigate("/dashboard/setting")}
              >
                <EditIcon className="!fill-yellow-50" />
                Edit
              </button>
            </p>
            <p className="text-sm text-richblack-300 lg:w-full md:w-full max-w-[18ch] truncate ">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </ContainerDashboard>
  );
};

export default ProfileImageAndNameComponent;
