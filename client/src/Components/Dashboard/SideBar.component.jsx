import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Icons from "react-icons/vsc";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { ConfirmationModal } from "../";
import sidebarLinks from "../../data/dashboard-links";
import { logout } from "../../services/Operation/AuthApi";

const SidebarComponent = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.profile);

  const navigate = useNavigate();

  const [confirmModal, setConfirmModal] = useState(null);

  return (
    <>
      <aside className="min-h-[calc(100vh-3.625rem)] min-w-[13.75rem] flex justify-start bg-richblack-800 border-r-2 border-r-richblack-700 w-max flex-col gap-7">
        <div className="mt-9 w-full">
          {sidebarLinks.map((data) => {
            if (data.type && user?.accountType !== data.type) return null;
            return <IconTextContainer key={data.id} {...data} />;
          })}
        </div>
        <div className="border-t-2 border-richblack-600 lg:w-[190px] mx-auto"></div>
        <div className="w-full ">
          <IconTextContainer
            name={"setting"}
            path={"/dashboard/setting"}
            icon={"VscGear"}
          />
          <button
            className="text-richblack-300 w-full text-sm flex mb-1 gap-3 py-2 px-6 font-inter font-[500] items-center transition-all duration-200 ease-in-out hover:bg-richblack-700 hover:scale-95"
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
            <FiLogOut className="text-lg" />
            Logout
          </button>
        </div>
      </aside>
      <AnimatePresence>
        {confirmModal && <ConfirmationModal modalData={confirmModal} />}
      </AnimatePresence>
    </>
  );
};

const IconTextContainer = ({ name, path, icon }) => {
  const location = useLocation();
  const Icon = Icons[icon];
  return (
    <Link
      to={path}
      className={`${
        location.pathname === path
          ? "text-yellow-50 bg-yellow-800 border-l-2 border-l-yellow-50"
          : "text-richblack-300"
      } text-sm flex mb-2 gap-3 py-2 px-6 font-inter font-[500] items-center transition-all duration-200 ease-in-out hover:bg-richblack-700 hover:scale-95 `}
    >
      <Icon
        className={`${
          location.pathname === path ? "stroke-1" : "stroke-[0.4px]"
        } text-lg`}
      />
      <span>{name}</span>
    </Link>
  );
};

export default SidebarComponent;
