import uniqid from "uniqid";

const tips = [
  "Set the Course Price option or make it free.",
  "Standard size for the course thumbnail is 1024x576.",
  "Video section controls the course overview video.",
  "Course Builder is where you create & organize a course.",
  "Course Builder is where you create & organize a course.",
  "Information from the Additional Data section shows up on the course single page.",
  "Make Announcements to notify any important",
  "Notes to all enrolled students at once.",
];

const UploadTip = () => {
  return (
    <aside className="p-6 lg:w-[53%] sticky top-[4%] border rounded-lg border-richblack-700 bg-richblack-800 self-start">
      <h2 className="text-lg text-richblack-5 font-semibold">
        ⚡ Course Upload Tips
      </h2>
      <ul className="mt-8 ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
        {tips.map((tip) => (
          <li key={uniqid()}>{tip}</li>
        ))}
      </ul>
    </aside>
  );
};

export default UploadTip;
