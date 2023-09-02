import { ContactDetailsComponent, ContactFormComponent } from "../Components";

const ContactPage = () => {
  return (
    <section className="flex justify-center items-center">
      <div className="w-11/12 flex py-24 gap-14 items-center">
        <ContactDetailsComponent />
        <div className="flex flex-col gap-8 p-[52px] border border-richblack-600 rounded-lg">
          <div>
            <h1 className="text-4xl text-richblack-5 font-semibold">
              Got a Idea? We’ve got the skills. Let’s team up
            </h1>
            <p className="text-richblack-300 mt-3">
              Tall us more about yourself and what you’re got in mind.
            </p>
          </div>
          <ContactFormComponent />
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
