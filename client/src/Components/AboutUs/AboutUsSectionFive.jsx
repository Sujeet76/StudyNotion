import { ContactFormComponent } from "../";

const AboutUsSectionFive = () => {
  return (
    <section className="pt-24 pb-4">
      <div className="w-11/12 flex flex-col items-center justify-center gap-8 mx-auto">
        <div className="text-center">
          <h4 className="text-4xl text-richblack-5 font-semibold">
            Get in Touch
          </h4>
          <p className="text-richblack-300 font-medium mt-3">
            We'd love to here for you, Please fill out this form.
          </p>
        </div>
        <ContactFormComponent
          heading={"Get in Touch"}
          subheading={"We'd love to here for you, Please fill out this form."}
        />
      </div>
    </section>
  );
};

export default AboutUsSectionFive;
