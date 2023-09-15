import {
  AboutUsSectionFive,
  AboutUsSectionFour,
  AboutUsSectionThree,
  AboutusSectionOne,
  AboutusSectionTwo,
  SliderComponent
} from "../Components";

const AboutPage = () => {
  return (
    <section className="w-full text-richblack-5">
      <AboutusSectionOne />
      <AboutusSectionTwo />
      <AboutUsSectionThree />
      <AboutUsSectionFour />
      <AboutUsSectionFive />
      <SliderComponent className="mb-24 -mt-12" />
    </section>
  );
};

export default AboutPage;
