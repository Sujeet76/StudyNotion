import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// icons
import { FaCaretDown } from "react-icons/fa6";
import { VscDashboard } from "react-icons/vsc";
import { FiLogOut } from "react-icons/fi";
import { Cart } from "../../data/Icon.data";

// constant
import { ACCOUNT_TYPE } from "../../utils/constants";
import { logout } from "../../services/Operation/AuthApi";

const StudentInstructorContainer = () => {
  const { cartLength } = useSelector((store) => store.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.profile);

  const [showMe, setShowMe] = useState(false);

  const logoutHandler = () => {
    dispatch(logout(navigate));
  };

  return (
    <>
      {
        // render when accountType is student only (cart)
        user && user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <Link to="/dashboard/cart" className="relative">
            <Cart />
            {cartLength > 0 && (
              <span className="w-5 h-5 rounded-full text-center  bg-richblack-600 text-yellow-100 text-sm font-eduSa font-bold grid place-content-center absolute bottom-1/2 left-[40%] animate-bounce">
                {cartLength}
              </span> 
            )}
          </Link>
        )
      }

      {/* menu list */}
      <div
        className="cursor-pointer flex justify-center items-center gap-1 relative"
        onClick={() => setShowMe(!showMe)}
      >
        <img
          src={user?.img}
          alt={"pixel"}
          className="rounded-full w-[30px] h-[30px] overflow-hidden  aspect-square  object-cover"
        />
        <FaCaretDown className="text-richblack-200 text-lg" />
      </div>
      <div
        className={` ${
          showMe ? "" : "hidden"
        } absolute top-[7%] right-16 z-[1000] divide-y divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800 transition-all duration-200`}
      >
        <Link to={"/dashboard/my-profile"}>
          <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
            <VscDashboard /> Dashboard
          </div>
        </Link>
        <div
          className="flex w-full items-center cursor-pointer gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          onClick={logoutHandler}
        >
          <FiLogOut /> Logout
        </div>
      </div>
    </>
  );
};

export default StudentInstructorContainer;
