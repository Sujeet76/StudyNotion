import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

import {
  AboutPage,
  CartPage,
  CatalogPage,
  ContactPage,
  EmailVerificationPage,
  HomePage,
  LoginPage,
  MainPageLayout,
  ProfilePage,
  ProtectedLayout,
  SettingPage,
  SharedLayout,
  SignupPage,
  EnrolledCoursePage,
  ForgetPage,
  ChangePasswordPage,
  AddCoursePage,
  MyCourse,
  EditCoursePage,
  CoursePage,
  ViewCourse,
  VideoDetailPage,
  DashboardInstructor,
} from "./Pages";

import { ACCOUNT_TYPE } from "./utils/constants";

import { getUserDetails } from "./services/Operation/ProfileApi";

export default function App() {
  const navigate = useNavigate();
  const { token } = useSelector((store) => store.auth);
  const { user } = useSelector((store) => store.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getUserDetails(token, navigate));
    }
  }, []);

  return (
    <div className="w-screen min-h-screen flex items-center flex-col bg-richblack-900">
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<MainPageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/catalog/:id" element={<CatalogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/course/:courseId" element={<CoursePage />} />
          {/* dashboard layout */}
          <Route
            element={
              <ProtectedLayout>
                <SharedLayout />
              </ProtectedLayout>
            }
          >
            <Route path="/dashboard/my-profile" element={<ProfilePage />} />
            <Route path="/dashboard/setting" element={<SettingPage />} />
            <Route path="/dashboard/cart" element={<CartPage />} />
            {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <Route path="/dashboard/add-course" element={<AddCoursePage />} />
            )}
            {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <Route path="/dashboard/my-courses" element={<MyCourse />} />
            )}
            {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <Route
                path="/dashboard/edit-course/:courseId"
                element={<EditCoursePage />}
              />
            )}
            {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <Route
                path="/dashboard/instructor"
                element={<DashboardInstructor />}
              />
            )}
            <Route
              path="/dashboard/enrolled-course"
              element={<EnrolledCoursePage />}
            />
          </Route>

          {/* view video course */}
          <Route
            element={
              <ProtectedLayout>
                <ViewCourse />
              </ProtectedLayout>
            }
          >
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <Route
                path="/dashboard/view-video/courseId/:courseId/section/:sectionId/subsectionId/:subsectionId"
                element={<VideoDetailPage />}
              />
            )}
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="email-verify" element={<EmailVerificationPage />} />
          <Route path="/forget-password" element={<ForgetPage />} />
          <Route path="/update-password/:id" element={<ChangePasswordPage />} />
          <Route
            path="*"
            element={
              <div>
                <h1 className="text-4xl font-black">404</h1>
              </div>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}
