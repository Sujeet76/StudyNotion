import { useNavigate } from "react-router-dom";

import { ButtonDashboard, RouteThoughClickComponent } from "../../";
import { PlusIcon } from "../AddCourse/courseBuilder/Icon";

const HeaderMyCourse = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between w-11/12 mx-auto items-start">
      <RouteThoughClickComponent title="My Course" />
      <ButtonDashboard
        isActive={true}
        className="mt-6"
        clickHandler={() => navigate("/dashboard/add-course")}
      >
        <PlusIcon />
        New
      </ButtonDashboard>
    </div>
  );
};

export default HeaderMyCourse;
