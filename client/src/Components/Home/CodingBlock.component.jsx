import React from "react";
import { TypeAnimation } from "react-type-animation";
import { Tilt } from "react-tilt";

import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimation,
} from "framer-motion";

const CardAndCoding = ({ codeContent, bgColor, fontColor, isRight }) => {
  const numbersArray = Array.from({ length: 14 }, (_, index) => index);
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  const controls = useAnimation();

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - 186);
    mouseY.set(clientY - top - 128);
  }

  const handleMouseLeave = () => {
    // Animate the div back to its original position
    controls.start({
      x: 0,
      y: 0,
      transition: { duration: 2 }, // Adjust the duration as needed
    });
    mouseX.set(0);
    mouseY.set(0);
  };
  const option = {
    scale: 1,
  };

  return (
    <Tilt options={option}>
      <motion.div
        className="flex self-start gap-2 text-sm code-border py-5 w-[345px] h-fit lg:w-[470px] relative overflow-hidden"
        onMouseMove={handleMouseMove}
        whileHover={{ scale: 1.1 }}
        initial={{
          x: isRight ? 100 : -100,
          opacity: 0,
        }}
        whileInView={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          type: "spring",
          bounce: 0.4,
          duration: 1,
        }}
        viewport={{
          once: true,
          amount: 0.5,
        }}
      >
        <motion.div
          className={`${bgColor} absolute select-none`}
          style={{
            top: useMotionTemplate`${mouseY}px`,
            left: useMotionTemplate`${mouseX}px`,
          }}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          initial={false}
        ></motion.div>
        <div className="font-inter font-[700] text-center text-sm leading-[22px] text-richblack-400 select-none w-[10%]">
          {numbersArray.map((index) => {
            return <p key={index}>{index + 1}</p>;
          })}
        </div>
        <div className={`font-mono font-[700] ${fontColor} w-[90%]`}>
          <TypeAnimation
            sequence={[`${codeContent}`, 1000, ""]}
            speed={50}
            style={{
              whiteSpace: "pre-line",
              wordBreak: "all",
              display: "block",
              lineHeight: "22px",
              fontWeight: "700",
              fontFamily: "Roboto Mono",
              // color: "#FFE83D",
            }}
            repeat={Infinity}
            omitDeletionAnimation={true}
          />
        </div>
      </motion.div>
    </Tilt>
  );
};

export default CardAndCoding;
