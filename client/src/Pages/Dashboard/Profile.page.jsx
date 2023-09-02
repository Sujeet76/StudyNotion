import {
  AboutComponent,
  ProfileImageAndNameComponent,
  RouteThoughClickComponent,
  PersonalDetails,
} from "../../Components";

const ProfilePage = () => {
  return (
    <main className="flex-1 bg-richblack-900 pb-[94px] text-richblack-5">
      <div className="w-11/12 mx-auto">
        <RouteThoughClickComponent className="" title={"My Profile"} />
        <div className="mt-14 flex flex-col gap-y-10">
          <ProfileImageAndNameComponent />
          <AboutComponent />
          <PersonalDetails />
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
