import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Icons from "react-icons/vsc";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { FaAngleLeft } from "react-icons/fa";

import { ConfirmationModal } from "../";
import sidebarLinks from "../../data/dashboard-links";
import { logout } from "../../services/Operation/AuthApi";
import { resetCourseState } from "../../Slice/course";

const SidebarComponent = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.profile);

  const navigate = useNavigate();

  const [confirmModal, setConfirmModal] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const isSmallScreen = () => window.innerWidth < 768;

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(!isSmallScreen());
  }, []);

  return (
    <>
      <motion.aside
        className="lg:min-h-[calc(100vh-3.625rem)] min-h-[calc(100vh - 82px)]  bg-richblack-800 border-r-2 border-r-richblack-700 w-max relative"
        animate={{ width: isOpen ? "220px" : "42px" }}
        transition={{ duration: 0.5, type: "spring", damping: 14 }}
      >
        <div className="overflow-hidden flex justify-start flex-col gap-7">
          {/* normal links */}
          <div className="mt-5 w-full">
            <motion.button
              className="p-3 rounded-full text-richblack-5 bg-richblack-700 shadow-sm shadow-richblack-500 hover:scale-95 hover:shadow-none transition-all duration-200 mb-4 ml-auto block mr-3"
              animate={{ rotate: isOpen ? "0" : "180deg" }}
              onClick={toggle}
            >
              <FaAngleLeft className="text-xl" />
            </motion.button>
            {sidebarLinks.map((data) => {
              if (data.type && user?.accountType !== data.type) return null;
              return <IconTextContainer key={data.id} {...data} />;
            })}
          </div>
          {/* for line */}
          <div className="border-t-2 border-richblack-600 w-full mx-auto"></div>
          {/* setting */}
          <div className="w-full">
            <IconTextContainer
              name={"setting"}
              path={"/dashboard/setting"}
              icon={"VscGear"}
            />

            {/* logout */}
            <button
              className="text-richblack-300 w-full text-sm flex mb-1 gap-3 py-2 px-3 font-inter font-[500] items-center transition-all duration-200 ease-in-out hover:bg-richblack-700 hover:scale-95 whitespace-nowrap"
              onClick={() =>
                setConfirmModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmModal(null),
                })
              }
            >
              <span>
                <FiLogOut className="text-lg" />
              </span>
              Logout
            </button>
          </div>
        </div>
      </motion.aside>
      <AnimatePresence>
        {confirmModal && <ConfirmationModal modalData={confirmModal} />}
      </AnimatePresence>
    </>
  );
};

const IconTextContainer = ({ name, path, icon }) => {
  const location = useLocation();
  const Icon = Icons[icon];
  const dispatch = useDispatch();
  return (
    <Link
      to={path}
      onClick={() => dispatch(resetCourseState())}
      className={`${
        location.pathname === path
          ? "text-yellow-50 bg-yellow-800 border-l border-l-yellow-50"
          : "text-richblack-300"
      } text-sm flex mb-2 gap-3 py-2 px-3 font-inter font-[500] items-center transition-all duration-200 ease-in-out hover:bg-richblack-700 hover:scale-95`}
    >
      <span>
        <Icon
          className={`${
            location.pathname === path ? "stroke-1" : "stroke-[0.4px]"
          } text-lg`}
        />
      </span>
      <span className="whitespace-nowrap">{name}</span>
    </Link>
  );
};

export default SidebarComponent;
