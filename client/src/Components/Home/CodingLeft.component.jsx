import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Button from "../Common/Button";

const CodingLeftComponent = ({ heading, subheading, btn1, btn2, isRight }) => {
  const textAnimation = {
    offscreen: { y: 100, opacity: 0 },
    onscreen: { y: 0, opacity: 1 },
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1,
    },
  };

  return (
    <div className="lg:w-[33rem] self-start">
      {heading}
      <motion.p
        className="text-richblack-300 text-base font-[500] font-inter mt-[12px]"
        variants={textAnimation}
      >
        {subheading}
      </motion.p>
      {/* button container */}
      <motion.div className="flex gap-6 mt-[3.25rem]">
        {/* first button */}
        <motion.div
          initial={{ x: !isRight ? -100 : 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0 }}
        >
          <Button active={btn1.active} linkTo={btn1.linkTo}>
            {btn1.children}
            <FaArrowRight className="group-hover:translate-x-2 transition-all duration-300" />
          </Button>
        </motion.div>
        {/* second container */}
        <motion.div
          initial={{ x: !isRight ? -100 : 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{
            delay: 0.3,
          }}
          viewport={{ once: true, amount: 0 }}
        >
          <Button active={btn2.active} linkTo={btn2.linkTo}>
            {btn2.children}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CodingLeftComponent;
