import {
  ContactDetailsComponent,
  ContactFormComponent,
  SliderComponent,
} from "../Components";

const ContactPage = () => {
  return (
    <section className="w-full">
      <div className="w-11/12 flex lg:flex-row flex-col md:flex-row justify-center py-24 gap-14 items-center mx-auto">
        {/* contact details */}
        <ContactDetailsComponent />
        <div className="flex flex-col gap-8 lg:p-[52px] p-6 border border-richblack-600 rounded-lg">
          <div>
            <h1 className="lg:text-4xl md:text-3xl text-3xl text-richblack-5 font-semibold">
              Got a Idea? We’ve got the skills. Let’s team up
            </h1>
            <p className="text-richblack-300 mt-3">
              Tall us more about yourself and what you’re got in mind.
            </p>
          </div>
          {/* contact form */}
          <ContactFormComponent />
        </div>
      </div>
      <SliderComponent className="mb-24 -mt-12" />
    </section>
  );
};

export default ContactPage;
