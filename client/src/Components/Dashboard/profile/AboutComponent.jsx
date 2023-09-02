import { EditIcon } from "../../../data/Icon.data";
import { ContainerDashboard, ButtonDashboard } from "../../";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AboutComponent = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.profile);
  return (
    <ContainerDashboard className="flex flex-col gap-y-10">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold text-richblack-5">About</h4>
        <ButtonDashboard
          isActive={true}
          // className="ml-auto"
          clickHandler={() => navigate("/dashboard/setting")}
        >
          <EditIcon />
          Edit
        </ButtonDashboard>
      </div>
      <p className="text-sm text-richblack-400 font-medium capitalize">
        {user?.additionDetails?.about ?? "Write something about yourself"}
      </p>
    </ContainerDashboard>
  );
};

export default AboutComponent;
