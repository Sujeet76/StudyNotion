import { Outlet } from "react-router-dom";
import { SideBarComponent, VideoSideBar } from "../../Components";

const SharedLayout = () => {
  return (
    <div className="flex w-full lg:min-h-[calc(100vh-3.625rem)] min-h-[calc(100vh-82px)]">
      <SideBarComponent />
      <div className="lg:h-[calc(100vh-3.625rem)] h-[calc(100vh-82px)] overflow-auto w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default SharedLayout;
