import { Outlet } from "react-router-dom";
import { SideBarComponent, VideoSideBar } from "../../Components";

const SharedLayout = ({ isVideo = false }) => {
  return (
    <div className="flex  w-full min-h-[calc(100vh-3.625rem)]">
      {isVideo ? <VideoSideBar /> : <SideBarComponent />}
      <div className="h-[calc(100vh-3.625rem)] overflow-auto w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default SharedLayout;
