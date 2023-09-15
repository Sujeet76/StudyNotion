import { Footer, NavigationBarComponent } from "../Components";

import { Outlet, useLocation } from "react-router-dom";

const PageLayout = () => {
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const showFooter =
    location.pathname === "/" ||
    pathArray.includes("catalog") ||
    pathArray.includes("about") ||
    pathArray.includes("contact") ||
    pathArray.includes("course");
  // console.log(location.pathname.includes("/"));
  return (
    <>
      <NavigationBarComponent />
      <Outlet />
      {showFooter && <Footer />}
    </>
  );
};

export default PageLayout;
