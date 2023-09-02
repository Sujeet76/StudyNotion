import {
  Cart,
  CartActive,
  EnrolledCourse,
  EnrolledCourseActive,
  Profile,
  ProfileActive,
} from "./icons.constants";

const SideBar = [
  {
    id: "dkjfka",
    icon: <Profile />,
    icon_a: <ProfileActive />,
    title: "Profile",
    linkTo: "/dashboard",
  },
  {
    id: "dkhjkhjjfka",
    icon: <EnrolledCourse />,
    icon_a: <EnrolledCourseActive />,
    title: "Enrolled course",
    linkTo: "/dashboard/enrolled-course",
  },
  {
    id: "dkajkjjljkhll",
    icon: <Cart />,
    icon_a: <CartActive />,
    title: "Cart",
    linkTo: "/dashboard/cart",
  },
];

export default SideBar;
