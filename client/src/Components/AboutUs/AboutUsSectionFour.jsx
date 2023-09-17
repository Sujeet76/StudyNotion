import { Button, HighLightedTextComponent } from "../";

const numberAndParas = [
  {
    active: "5",
    title: "Active Students",
  },
  {
    active: "10",
    title: "Mentors",
  },
  {
    active: "200",
    title: "Courses",
  },
  {
    active: "50",
    title: "Awards",
  },
];

const gridData = [
  {
    heading: "Curriculum Based on Industry Needs",
    subheading:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    heading: "Our Learning Method",
    subheading: "The learning process uses the namely online and offline.",
  },
  {
    heading: "Certification",
    subheading:
      "You will get a certificate that can be used as a certification during job hunting.",
  },
  {
    heading: 'Rating "Auto-grading"',
    subheading:
      "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
  },
  {
    heading: "Ready to Work",
    subheading:
      "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
  },
];

const AboutUsSectionFour = () => {
  return (
    <section className="text-richblack-5 text-center">
      <div className="border-b-2 border-b-richblack-700 bg-richblack-800 flex justify-center items-center">
        <div className="grid lg:grid-cols-4 grid-cols-2 w-11/12">
          {numberAndParas.map(({ active, title }, index) => (
            <div key={active} className="py-10">
              <h5 className="text-3xl font-bold">
                {active}
                {index === 0 ? "K" : "+"}
              </h5>
              <p className="text-richblack-400 mt-3">{title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* gird */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2  w-11/12 mx-auto text-start py-24">
        {/* div1 -> largest */}
        <div className="lg:col-span-2 md:col-span-2 lg:row-span-1 lg:pb-0 pb-10">
          <h4 className="text-richblack-5 text-4xl font-semibold">
            World-Class Learning for{" "}
            <HighLightedTextComponent text={"Anyone, Anywhere"} />
          </h4>
          <p className="text-richblack-300 mt-3 mb-12">
            Studynotion partners with more than 275+ leading universities and
            companies to bring flexible, affordable, job-relevant online
            learning to individuals and organizations worldwide.
          </p>
          <Button active={true}>Learn More</Button>
        </div>

        {/* remaining div*/}
        {gridData.map(({ heading, subheading }, index) => (
          <div
            className={`${
              index === 2 ? "lg:col-start-2 lg:h-64" : ""
            } even:bg-richblack-700 odd:bg-richblack-800 p-8
            }`}
            key={index}
          >
            <h5 className="text-lg text-richblack-5 mb-8 font-semibold">
              {heading}
            </h5>
            <p className="text-sm text-richblack-100">{subheading}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUsSectionFour;
