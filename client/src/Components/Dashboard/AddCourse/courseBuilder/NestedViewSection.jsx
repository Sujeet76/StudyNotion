import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { ConfirmationModal } from "../../../";
import {
  DeleteIcon,
  DropDownArrowIcon,
  DropDownListIcon,
  EditIcon,
  AddIcon,
} from "./Icon";

import {
  deleteSection,
  deleteSubsection,
} from "../../../../services/Operation/CourseApi";
import CreateSubSection from "./CreateSubSection";

const NestedViewSection = ({ handelEditSection }) => {
  const dispatch = useDispatch();
  const { course } = useSelector((store) => store.course);
  const { token } = useSelector((store) => store.auth);

  const [confirmationModal, setConfirmationModal] = useState(null);

  // for managing subsection data
  const [addSubsection, setAddSubsection] = useState(null);
  const [viewSubsection, setViewSubsection] = useState(null);
  const [editSubsection, setEditSubsection] = useState(null);

  const handleDeleteSection = (id) => {
    dispatch(deleteSection(id, course?._id, token));
    setConfirmationModal(null);
  };

  const handleDeleteSubsection = (sectionId, subSectionId) => {
    dispatch(deleteSubsection(sectionId, subSectionId, token, course));
    setConfirmationModal(null);
  };

  return (
    <>
      <div className="bg-richblack-700 px-6 py-8 rounded-xl">
        {course?.courseContent.map(({ _id, sectionName, subSection }) => (
          // container containing section and subsection
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            // key={"details"}
            key={_id}
            className="overflow-hidden"
          >
            <details open>
              {/* sectionName */}
              <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                <p className="flex items-center gap-x-3 font-semibold text-richblack-50 capitalize">
                  <DropDownListIcon />
                  {sectionName}
                </p>
                <div className="flex items-center gap-x-3">
                  <button onClick={() => handelEditSection(_id, sectionName)}>
                    <EditIcon />
                  </button>
                  <button
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Delete this Section?",
                        text2:
                          "All the lectures in this section will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleDeleteSection(_id),
                        btn2Handler: () => setConfirmationModal(null),
                      })
                    }
                  >
                    <DeleteIcon />
                  </button>
                  <span className="font-medium text-richblack-300">|</span>
                  <DropDownArrowIcon />
                </div>
              </summary>

              {/* subsection  */}
              {subSection?.length > 0 && (
                // subsection container
                <div className="px-6 pb-4">
                  {subSection.map((data) => (
                    // individual subsection
                    <div
                      className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                      key={data._id}
                      onClick={() => setViewSubsection(data)}
                    >
                      <p className="flex items-center gap-x-3 py-2 ">
                        <DropDownListIcon />
                        <span>{data?.title}</span>
                      </p>
                      <div
                        className="flex items-center gap-x-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={(e) =>
                            setEditSubsection({ ...data, sectionId: _id })
                          }
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={(e) => {
                            setConfirmationModal({
                              text1: `Delete this Sub-Section(${data?.title})?`,
                              text2: "This lecture will be deleted",
                              btn1Text: "Delete",
                              btn2Text: "Cancel",
                              btn1Handler: () =>
                                handleDeleteSubsection(_id, data._id),
                              btn2Handler: () => setConfirmationModal(null),
                            });
                          }}
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* create sub-section */}
              <button
                className="flex font-medium text-yellow-50 mt-4"
                // section id
                onClick={() => setAddSubsection(_id)}
              >
                <AddIcon />
                Add subsection
              </button>
            </details>
          </motion.div>
        ))}
      </div>

      {/* create */}
      <AnimatePresence>
        {addSubsection && (
          <CreateSubSection
            modalData={addSubsection}
            setModalData={setAddSubsection}
            add={true}
          />
        )}
      </AnimatePresence>
      {/* view */}
      <AnimatePresence>
        {viewSubsection && (
          <CreateSubSection
            modalData={viewSubsection}
            setModalData={setViewSubsection}
            view={true}
          />
        )}
      </AnimatePresence>
      {/* edit */}
      <AnimatePresence>
        {editSubsection && (
          <CreateSubSection
            modalData={editSubsection}
            setModalData={setEditSubsection}
            edit={true}
          />
        )}
      </AnimatePresence>

      {/* confirm to delete section */}
      <AnimatePresence>
        {confirmationModal && (
          <ConfirmationModal modalData={confirmationModal} />
        )}
      </AnimatePresence>
    </>
  );
};

export default NestedViewSection;
