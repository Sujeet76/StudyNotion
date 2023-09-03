import { useNavigate } from "react-router-dom";

import { ButtonDashboard, RouteThoughClickComponent } from "../../";
import { PlusIcon } from "../AddCourse/courseBuilder/Icon";
import { useDispatch } from "react-redux";
import { resetCourseState } from "../../../Slice/course";

const HeaderMyCourse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between w-11/12 mx-auto items-start">
      <RouteThoughClickComponent title="My Course" />
      <ButtonDashboard
        isActive={true}
        className="mt-6"
        clickHandler={() => {
          dispatch(resetCourseState());
          navigate("/dashboard/add-course");
        }}
      >
        <PlusIcon />
        New
      </ButtonDashboard>
    </div>
  );
};

export default HeaderMyCourse;
