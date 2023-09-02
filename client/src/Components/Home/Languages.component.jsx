import { motion } from "framer-motion";
import { Button, HighLightedTextComponent } from "../";
import img1 from "../../assets/img1.svg";
import img2 from "../../assets/img2.svg";
import img3 from "../../assets/img3.svg";

const LanguagesComponent = () => {
  return (
    <div className="w-11/12 flex flex-col gap-4 justify-center items-center mx-auto ">
      <div className="text-center mt-4">
        <h1 className="text-richblack-900 text-4xl font-semibold font-inter ">
          Your swiss knife for{" "}
          <HighLightedTextComponent text={"learning any language"} />
        </h1>
        <p className="max-w-[66%] text-base text-richblack-700 font-inter font-[500] mt-3 text-center mx-auto">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </p>
      </div>

      <div className="flex w-11/12">
        <motion.img
          drag
          dragElastic={0.8}
          dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
          initial={{ x: 0, y: 0 }}
          whileHover={{ scale: 1.05, cursor: "grab" }}
          whileTap={{ cursor: "grabbing", scale: 0.9 }}
          src={img1}
          alt=""
        />
        <motion.img
          drag
          dragElastic={0.8}
          dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
          initial={{ x: 0, y: 0 }}
          whileHover={{ scale: 1.05, cursor: "grab" }}
          whileTap={{ cursor: "grabbing", scale: 0.9 }}
          className="-ml-32"
          src={img2}
          alt=""
        />
        <motion.img
          drag
          dragElastic={0.8}
          dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
          initial={{ x: 0, y: 0 }}
          whileHover={{ scale: 1.05, cursor: "grab" }}
          whileTap={{ cursor: "grabbing", scale: 0.9 }}
          className="-ml-[10rem]"
          src={img3}
          alt=""
        />
      </div>

      <div className="mb-[80px]">
        <Button active={true} linkTo={"/signup"}>
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default LanguagesComponent;
