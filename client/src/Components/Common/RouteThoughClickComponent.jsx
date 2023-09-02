import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbBackslash } from "react-icons/tb";

const RouteThoughClickComponent = ({ className, title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathArray = location.pathname.split("/").filter((ele) => ele !== "");
  pathArray.unshift("home");

  return (
    <div className={`mt-6  ${className}`}>
      <div>
        {pathArray.map((element, index) => (
          <span
            className={` ${
              element === pathArray[pathArray.length - 1]
                ? "text-yellow-50 font-semibold"
                : "text-richblack-300"
            } text-sm  capitalize`}
            key={`${index}djfkla;`}
          >
            {element.replaceAll("-", " ")}
            {index !== pathArray.length - 1 && (
              <span className="mx-2 text-richblack-600">/</span>
            )}
          </span>
        ))}
      </div>
      <h1 className="text-3xl text-richblack-5 font-medium mt-3">{title}</h1>
    </div>
  );
};

export default RouteThoughClickComponent;
