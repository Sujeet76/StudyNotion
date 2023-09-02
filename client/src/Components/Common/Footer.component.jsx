import Logo from "../../assets/Logo.svg";
import { ImHeart } from "react-icons/im";
import youtube from "../../assets/youtube.svg";
import twitter from "../../assets/twitter.svg";
import google from "../../assets/google.svg";
import facebook from "../../assets/facebook.svg";
import { Link } from "react-router-dom";

import {
  subjects,
  languages,
  communities,
  careers,
  plans,
  resources,
  companies,
} from "../../data/footer-links";

const Footer = () => {
  return (
    <div className="w-full bg-richblack-800">
      <footer className="w-11/12 bg-richblack-800 flex flex-col mx-auto justify-center items-center pt-[90px] gap-8">
        <div className=" flex gap-9">
          <div className="flex gap-4">
            <div className="flex gap-3">
              <div>
                <img src={Logo} alt="studyNotion logo" />
                <div className="mt-3">
                  <List heading={"Company"} data={companies} />
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <img src={facebook} alt="" />
                  <img src={google} alt="" />
                  <img src={twitter} alt="" />
                  <img src={youtube} alt="" />
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <div>
                  <List heading={"Resources"} data={resources} />
                </div>
                <div>
                  <h6 className="text-base font-inter font-semibold text-richblack-100">
                    Support
                  </h6>
                  <ul className="mt-3">
                    <li className="text-richblack-400 text-sm font-normal mb-2">
                      Support center
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-9">
              <div>
                <List heading={"Plans"} data={plans} />
              </div>
              <div className="">
                <List heading={"Community"} data={communities} />
              </div>
            </div>
          </div>
          <div className="border border-richblack-700"></div>
          <div className="flex gap-3">
            <div>
              <List heading={"Subjects"} data={subjects} />
            </div>
            <div>
              <List heading={"Languages"} data={languages} />
            </div>
            <div>
              <List heading={"Career building"} data={careers} />
            </div>
          </div>
        </div>
        <hr className="w-full border border-richblack-700" />
        <div className="flex justify-between w-full items-center mb-9">
          <div className="flex gap-4 py-1">
            <span className="text-richblack-300 text-sm font-[500] pr-4 border-r border-r-richblack-700 ">
              Privacy Policy
            </span>
            <span className="text-richblack-300 text-sm font-[500] pr-4 border-r border-r-richblack-700 ">
              Cookie Policy
            </span>
            <span className="text-richblack-300 text-sm font-[500]">Terms</span>
          </div>
          <div>
            <p className="flex justify-center items-center text-sm font-semibold text-richblack-300">
              Made with&nbsp;&nbsp;{" "}
              <ImHeart className="text-base text-pink-200" /> &nbsp;&nbsp;sujeet
              © 2023 StudyNotion
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const List = ({ heading, data }) => {
  return (
    <>
      <h6 className="text-base font-inter font-semibold text-richblack-100 mb-3">
        {heading}
      </h6>
      <ul className="mt-3 w-[174px]">
        {data.map(({ id, name }) => (
          <li
            key={`${id}${name}`}
            className="text-richblack-400 text-sm font-normal mb-2"
          >
            <Link to="#">{name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Footer;
