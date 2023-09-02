import {
  AboutUsSectionFive,
  AboutUsSectionFour,
  AboutUsSectionThree,
  AboutusSectionOne,
  AboutusSectionTwo,
} from "../Components";

const AboutPage = () => {
  return (
    <section className="w-full text-richblack-5">
      <AboutusSectionOne />
      <AboutusSectionTwo />
      <AboutUsSectionThree />
      <AboutUsSectionFour />
      <AboutUsSectionFive />
    </section>
  );
};

export default AboutPage;
