import { motion } from "framer-motion";

import ButtonDashboard from "./ButtonDashboard";

const ConfirmationModal = ({ modalData }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
    >
      <motion.div
        className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <p className="text-2xl font-semibold text-richblack-5">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-richblack-200">
          {modalData?.text2}
        </p>
        <div className="flex items-center gap-x-4">
          <ButtonDashboard
            clickHandler={modalData?.btn1Handler}
            isActive={true}
          >
            {modalData?.btn1Text}
          </ButtonDashboard>
          <ButtonDashboard clickHandler={modalData?.btn2Handler}>
            {modalData?.btn2Text}
          </ButtonDashboard>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConfirmationModal;
