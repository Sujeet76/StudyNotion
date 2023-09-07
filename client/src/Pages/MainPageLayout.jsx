import { Footer, NavigationBarComponent } from "../Components";

import { Outlet, useLocation } from "react-router-dom";

const PageLayout = () => {
  const location = useLocation();
  const showFooter =
    location.pathname === "/" ||
    location.pathname.includes("catalog") ||
    location.pathname.includes("about") ||
    location.pathname.includes("contact") ||
    location.pathname.includes("course");
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
