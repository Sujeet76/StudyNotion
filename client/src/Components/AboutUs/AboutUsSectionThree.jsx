import { HighLightedTextComponent } from "../";

import foundingStory from "../../assets/FoundingStory.png";

const AboutUsSectionThree = () => {
  return (
    <section className="py-[90px] flex justify-center items-center flex-col">

      {/* img with text */}
      <div className="w-11/12 flex gap-24 justify-center items-center">
        <div className="lg:w-[40%]">
          <h3 className="text-3xl font-semibold">
            <HighLightedTextComponent
              text={"Our Founding Story "}
              additionClass="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]"
            />
          </h3>
          <p className="font-medium text-richblack-300 mt-6">
            Our e-learning platform was born out of a shared vision and passion
            for transforming education. It all began with a group of educators,
            technologists, and lifelong learners who recognized the need for
            accessible, flexible, and high-quality learning opportunities in a
            rapidly evolving digital world.
          </p>
          <p className="font-medium text-richblack-300 mt-4">
            As experienced educators ourselves, we witnessed firsthand the
            limitations and challenges of traditional education systems. We
            believed that education should not be confined to the walls of a
            classroom or restricted by geographical boundaries. We envisioned a
            platform that could bridge these gaps and empower individuals from
            all walks of life to unlock their full potential.
          </p>
        </div>
        <div className="relative">
          <div
            className=" w-[300px] h-[250px] opacity-20 rounded-full absolute top-0 left-0 bg-transparent"
            style={{
              boxShadow: "0px 0px 90px 30px #EC008C,0px 0px 67px 17px  #FC6767",
            }}
          ></div>
          <img
            src={foundingStory}
            alt={"founding story"}
            className="relative z-10"
          />
        </div>
      </div>

      {/* vision */}
      <div className="flex lg:flex-row flex-col gap-24 justify-center items-center lg:mt-20 w-11/12">
        <div className="lg:w-[40%]">
          <h4 className="text-3xl font-semibold">
            <HighLightedTextComponent
              text={"Our Vision"}
              additionClass="bg-gradient-to-br from-[#E65C00] to-[#F9D423]"
            />
          </h4>
          <p className="font-medium text-richblack-300 mt-6">
            With this vision in mind, we set out on a journey to create an
            e-learning platform that would revolutionize the way people learn.
            Our team of dedicated experts worked tirelessly to develop a robust
            and intuitive platform that combines cutting-edge technology with
            engaging content, fostering a dynamic and interactive learning
            experience.
          </p>
        </div>
        <div className="lg:w-[40%]">
          <h4 className="text-3xl font-semibold">
            <HighLightedTextComponent text={"Our Mission"} />
          </h4>
          <p className="font-medium text-richblack-300 mt-6">
            our mission goes beyond just delivering courses online. We wanted to
            create a vibrant community of learners, where individuals can
            connect, collaborate, and learn from one another. We believe that
            knowledge thrives in an environment of sharing and dialogue, and we
            foster this spirit of collaboration through forums, live sessions,
            and networking opportunities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSectionThree;
