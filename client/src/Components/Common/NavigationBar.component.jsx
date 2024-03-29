import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Logo_white from "../../assets/logo-white.svg";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import DropDownList from "./DropDownList.component";

import { NavbarLinks } from "../../data";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import StudentInstructorContainer from "./StudentInstructorContainer";
import NavBarSidePanel from "./NavBarSidePanel";

import { getCategory } from "../../services/Operation/CourseApi";

const NavigationBarComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebar, setIsSidebar] = useState(false);

  const location = useLocation();
  const { token } = useSelector((store) => store.auth);
  const { categories } = useSelector((store) => store.course);
  const dispatch = useDispatch();

  // form fixing navbar and change color based on location
  const isHome =
    location.pathname.includes("/") && location.pathname.length === 1;

  useEffect(() => {
    dispatch(getCategory(setIsLoading));
  }, []);

  return (
    <header
      className={`${
        isHome ? "bg-richblack-900" : "bg-richblack-800"
      } w-full border-b-2  border-b-richblack-700 flex flex-col justify-center items-center`}
    >
      <div className="w-11/12 flex justify-between items-center lg:h-14 h-20">
        {/* logo */}
        <Link to="/">
          <img src={Logo_white} alt="studyNotion" className="w-40" />
        </Link>

        {/* // nav bar */}
        <nav className="hidden lg:block md:block">
          <ul className="flex items-center gap-3">
            {NavbarLinks.map((navbar, index) =>
              navbar?.title === "Catalog" ? (
                <DropDownList
                  categoryList={categories}
                  title={navbar?.title}
                  key={index}
                />
              ) : (
                <NormalNavText
                  {...navbar}
                  location={location.pathname}
                  key={index}
                />
              )
            )}
          </ul>
        </nav>

        <div>
          <div className="flex justify-center items-center gap-3">
            {token === null && (
              <div className="lg:flex justify-center items-center gap-3 hidden">
                <Button linkTo={"/login"} isNormal={true}>
                  Login
                </Button>
                <Button linkTo={"/signup"} isNormal={true}>
                  Sign up
                </Button>
              </div>
            )}
            {token && <StudentInstructorContainer />}
            <FaBars
              className="text-2xl text-richblack-100 cursor-pointer lg:hidden"
              onClick={() => setIsSidebar(!isSidebar)}
            />
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {isSidebar && (
          <NavBarSidePanel
            navLinks={NavbarLinks}
            categoryList={categories}
            setIsSidebar={setIsSidebar}
            isSidebar={isSidebar}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

const NormalNavText = ({ title, path, location }) => {
  return (
    <li>
      <NavLink
        className={`px-3 py-1 text-base hover:font-semibold transition-all duration-200  hover:text-yellow-50 ${
          location === path
            ? "text-yellow-50 font-semibold"
            : "text-richblack-25 font-normal"
        }`}
        to={path}
      >
        {title}
      </NavLink>
    </li>
  );
};

export default NavigationBarComponent;
