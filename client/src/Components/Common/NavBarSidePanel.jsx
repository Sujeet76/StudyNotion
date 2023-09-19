import { FaAngleLeft } from "react-icons/fa6";

import { Button } from "../";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, NavLink } from "react-router-dom";

const NavBarSidePanel = ({
  navLinks,
  categoryList,
  isSidebar,
  setIsSidebar,
}) => {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const close = () => {
    setIsSidebar(!isSidebar);
  };

  return (
    <motion.div
      className="fixed min-h-screen inset-0 bg-[rgba(36,36,40,.8)] w-full lg:hidden backdrop-blur-[10px] z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.05,
        type: "spring",
      }}
    >
      <motion.div
        className="w-[300px] h-full border-r border-[rgba(0,0,0,.1)] py-5 bg-[rgba(255,255,255,.1)] overflow-auto scroll-bar"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "-100%" }}
        transition={{
          // delay: 0.3,
          type: "easeOut",
        }}
      >
        <button
          className="py-2 px-4 rounded-full text-sm leading-6 text-richblack-5 bg-[#56565b] flex items-center font-semibold ml-3 text-center"
          onClick={close}
        >
          <FaAngleLeft />
          Close menu
        </button>

        <div className="bg-[rgba(0,0,0,.2)] w-full h-auto p-4 mt-5">
          <div className="flex justify-evenly items-center">
            <Button linkTo={"/login"} clickHandler={close}>
              Login
            </Button>
            <Button linkTo={"/signup"} clickHandler={close} active={true}>
              signup
            </Button>
          </div>
        </div>

        {/* links */}
        <div className="mt-6 w-full">
          <ul>
            {navLinks.map((navbar, index) =>
              navbar?.title === "Catalog" ? (
                <li
                  key={index}
                  className="border-b border-b-[rgba(255,255,255,.05)]"
                >
                  <div
                    className={`flex gap-4 items-center p-4 text-base font-semibold ${
                      isOpen
                        ? "bg-[#222327] text-yellow-50"
                        : "bg-transparent text-richblack-5"
                    } transition-all duration-200`}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <span>{navbar?.title}</span>
                    <motion.span
                      initial={{ rotate: "0deg" }}
                      animate={{ rotate: isOpen ? "90deg" : "0deg" }}
                    >
                      <FaAngleLeft className="rotate-180" />
                    </motion.span>
                  </div>
                  <motion.div
                    className="overflow-hidden"
                    initial={{ height: 0 }}
                    animate={{ height: isOpen ? "auto" : 0 }}
                    transition={{
                      type: "spring",
                      staggerChildren: 0.5,
                    }}
                  >
                    <ul>
                      {categoryList?.length <= 0 ? (
                        <motion.li
                          initial={{ x: -100 }}
                          animate={{ x: isOpen ? 0 : -100 }}
                          transition={{
                            delay: 0.05 * index,
                          }}
                        >
                          No category found 😶‍🌫️
                        </motion.li>
                      ) : (
                        categoryList?.map((links, index) => (
                          <motion.li
                            key={links?._id}
                            className="border-b border-b-white last:border-none"
                            initial={{ x: -200 }}
                            animate={{ x: isOpen ? 0 : -200 }}
                            transition={{
                              delay: 0.05 * index,
                            }}
                            onClick={close}
                          >
                            <NavLink
                              to={`/catalog/${links?.categoryName.replaceAll(
                                " ",
                                "-"
                              )}`}
                              className="block pl-8 p-4 text-base font-semibold text-richblack-5"
                            >
                              {links.categoryName}
                            </NavLink>
                          </motion.li>
                        ))
                      )}
                    </ul>
                  </motion.div>
                </li>
              ) : (
                <NormalNavText
                  {...navbar}
                  location={location.pathname}
                  key={index}
                  onclick={close}
                />
              )
            )}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

const NormalNavText = ({ title, path, location, onclick }) => {
  return (
    <li>
      <NavLink
        className={`block p-4 text-base border-b border-b-[rgba(255,255,255,.05)] font-semibold transition-all duration-200  hover:text-yellow-50 ${
          location === path
            ? "text-yellow-50 font-semibold"
            : "text-richblack-5 font-normal"
        }`}
        to={path}
        onClick={onclick}
      >
        {title}
      </NavLink>
    </li>
  );
};

export default NavBarSidePanel;
