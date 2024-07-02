import { HiCheckCircle } from "react-icons/hi";
import { BiSolidMessageRoundedError } from "react-icons/bi";
import { RiCloseCircleFill } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";
import { ImSpinner2 } from "react-icons/im";

export const Feedback = ({ type, message, setOpen }) => {
  setTimeout(setOpen, 3000);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1}}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", duration: 1.2 }}
        className={`fixed bottom-28 left-10 rounded-md shadow-md z-[5000] ${
          type === "success" ? "bg-green-500" : "bg-red-500"
        } flex items-center  p-3 min-w-80`}
      >
        <div className="flex items-center space-x-2 p-1">
          {type === "success" ? (
            <HiCheckCircle className="text-2xl text-white" />
          ) : (
            <BiSolidMessageRoundedError className="text-2xl text-white" />
          )}
          <div className="text-white">
            <p className="text-base">{message}</p>
          </div>
        </div>
        <button
          className="absolute bg-red-500 rounded-full -top-2 -right-1"
          onClick={() => setOpen()}
        >
          <RiCloseCircleFill className="text-white text-lg" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};


export const Spin = () => <ImSpinner2 size={20} className="animate-spin" />;




export const Motion = ({ children }) => (
    <motion.div
        key="transition"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 1 }}
        exit={{ opacity: 0, y: 0 }}
        transition={{
            type: "spring",
            duration: 0.5,
            bounce: 0.5,
        }}
        className="fixed flex justify-center w-full h-screen top-20 bg-white/60 backdrop-blur-sm"
    >
        {children}
    </motion.div>
)

