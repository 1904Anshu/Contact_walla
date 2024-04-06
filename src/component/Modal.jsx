import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    isOpen ? (
      <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="relative z-50 bg-white rounded-lg p-4">
          <div className="absolute top-0 right-0 m-2">
            <AiOutlineClose
              onClick={onClose}
              className="cursor-pointer text-gray-500 hover:text-gray-700"
            />
          </div>
          {children}
        </div>
      </div>
    ) : null,
    document.getElementById("modal-root")
  );
};

export default Modal;
