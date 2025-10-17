import React from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { FaRegSave } from "react-icons/fa";

// Pre-processor allowing you to add custom strudel code to trigger changes
// Hidden by default but acts as a pop-up if the user wants to see the pre-processed code and edit manually
// User react-dom createPortal to explicitly render above the HTML body as this is pop-up behaviour
function Preprocessor({ isOpen, onClose, procText }) {
  if (!isOpen) return null;

  return (
    <div className="preprocessor-dialog">
      <div className="preprocessor-content">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4 className="m-0">Pre-Processor</h4>
          <div>
              <button className='btn btn-outline-secondary mr-2'>
                Save <FaRegSave size={14} />
              </button>
             <button className="btn btn-outline-secondary" onClick={onClose}>
              <IoCloseSharp size={14} />
            </button>           
          </div>
        </div>
        <div>
          <p className='text-lg'>View and edit the raw pre-processor code manually</p>
          <textarea value={procText} className="form-control" rows="12" id="proc" ></textarea>
        </div>
      </div>
    </div>
  );
}
export default Preprocessor