import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

import Upload from "../uploadFiles";
import { ButtonDashboard, ReactFormRow, ReactFormTextarea } from "../../../";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createSubSection,
  updateSubsection,
} from "../../../../services/Operation/CourseApi";

const CreateSubSection = ({
  modalData,
  setModalData,
  view = false,
  edit = false,
  add = false,
}) => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);
  const { course } = useSelector((store) => store.course);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (view || edit) {
      setValue("lectureUrl", modalData.videoUrl);
      setValue("lectureTitle", modalData.title);
      setValue("lectureDescription", modalData.description);
    }
  }, []);

  const isFormUpdated = () => {
    const data = getValues();
    if (
      data.lectureTitle !== modalData.title ||
      data.lectureUrl !== modalData.videoUrl ||
      data.lectureDescription !== modalData.description
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = async (data) => {
    if (view) return;

    // updation
    if (edit) {
      if (isFormUpdated()) {
        const formData = new FormData();
        formData.append("sectionId", modalData.sectionId);
        formData.append("subsectionId", modalData._id);
        const currentValue = getValues();
        if (modalData.title !== currentValue.lectureTitle)
          formData.append("title", currentValue.lectureTitle);
        if (modalData.videoUrl !== currentValue.lectureUrl)
          formData.append("videoFile", currentValue.lectureUrl);
        if (modalData.description !== currentValue.lectureDescription)
          formData.append("description", currentValue.lectureDescription);
        dispatch(
          updateSubsection(
            formData,
            modalData.sectionId,
            token,
            course,
            setModalData
          )
        );
        return;
      } else {
        toast.error("No changes made");
        return;
      }
    }

    // creation
    const formData = new FormData();
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDescription);
    formData.append("videoFile", data.lectureUrl);
    formData.append("sectionId", modalData);
    dispatch(
      createSubSection(formData, token, course, modalData, setModalData)
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm"
        key="subSectionModal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.1 }}
      >
        <motion.div
          className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
            <h4 className="text-xl font-semibold text-richblack-5">
              {add
                ? "Add lecture"
                : view
                ? "view Lecture info"
                : edit
                ? "Edit Lecture"
                : ""}
            </h4>
            <button onClick={() => setModalData(null)}>
              <CrossIcon />
            </button>
          </div>
          <div>
            <form
              className="flex flex-col gap-6 p-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Upload
                label="Lecture Video"
                name="lectureUrl"
                register={register}
                errors={errors}
                setVal={setValue}
                video={true}
                viewData={view ? modalData.videoUrl : null}
                editData={edit ? modalData.videoUrl : null}
              />
              <ReactFormRow
                type="text"
                required={true}
                id="lectureTitle"
                label="Lecture Title"
                register={register}
                errors={errors}
                error="lecture title is required"
                placeholder="Enter Lecture Title"
              />
              <ReactFormTextarea
                required={true}
                id="lectureDescription"
                label="Lecture Description"
                register={register}
                errors={errors}
                error="lecture description is required"
                placeholder="write something about lecture"
              />
              {!view && (
                <div className="flex gap-6 self-end">
                  {edit && (
                    <ButtonDashboard
                      typeBtn="button"
                      clickHandler={() => setModalData(null)}
                    >
                      Cancel
                    </ButtonDashboard>
                  )}
                  <ButtonDashboard typeBtn="submit" isActive={true}>
                    {edit ? "Save Edits" : add ? "Add subsection" : ""}
                  </ButtonDashboard>
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const CrossIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M14.1213 12.5003L18.0003 8.61731C18.2522 8.33107 18.3856 7.95967 18.3734 7.5786C18.3612 7.19753 18.2044 6.8354 17.9348 6.56581C17.6652 6.29622 17.3031 6.1394 16.922 6.12723C16.541 6.11507 16.1696 6.24846 15.8833 6.50031L12.0003 10.3793L8.11032 6.48831C7.97099 6.34898 7.80558 6.23845 7.62353 6.16305C7.44148 6.08764 7.24637 6.04883 7.04932 6.04883C6.85228 6.04883 6.65716 6.08764 6.47511 6.16305C6.29307 6.23845 6.12765 6.34898 5.98832 6.48831C5.84899 6.62764 5.73846 6.79305 5.66306 6.9751C5.58765 7.15715 5.54884 7.35226 5.54884 7.54931C5.54884 7.74635 5.58765 7.94147 5.66306 8.12352C5.73846 8.30556 5.84899 8.47098 5.98832 8.61031L9.87932 12.5003L6.00032 16.3823C5.84819 16.5183 5.72541 16.6839 5.63948 16.869C5.55356 17.054 5.5063 17.2547 5.50059 17.4587C5.49488 17.6626 5.53085 17.8656 5.60629 18.0552C5.68173 18.2448 5.79506 18.417 5.93934 18.5613C6.08362 18.7056 6.25583 18.8189 6.44542 18.8943C6.63501 18.9698 6.83799 19.0058 7.04196 19C7.24593 18.9943 7.44659 18.9471 7.63166 18.8611C7.81674 18.7752 7.98233 18.6524 8.11832 18.5003L12.0003 14.6213L15.8783 18.5003C16.1597 18.7817 16.5414 18.9398 16.9393 18.9398C17.3373 18.9398 17.7189 18.7817 18.0003 18.5003C18.2817 18.2189 18.4398 17.8373 18.4398 17.4393C18.4398 17.0414 18.2817 16.6597 18.0003 16.3783L14.1213 12.5003Z"
        fill="#C5C7D4"
      />
    </svg>
  );
};

export default CreateSubSection;
