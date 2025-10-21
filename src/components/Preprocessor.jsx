import React, { useEffect, useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { FaRegSave } from "react-icons/fa";

// Pre-processor allowing you to add custom strudel code to trigger changes
// Hidden by default but acts as a pop-up if the user wants to see the pre-processed code and edit manually
// User react-dom createPortal to explicitly render above the HTML body as this is pop-up behaviour
function Preprocessor({ 
  isOpen, 
  onClose, 
  procText,
  setProcText,
}) {
  const [localTextBuf, setLocalTextBuf] = useState(""); // allows local editing before saving to parent state

  // Set local when pop up opens or proc text changes
  useEffect(() =>{
    if(isOpen) {
      setLocalTextBuf(procText || "write your strudel code here and save to apply...")
    }
  }, [isOpen, procText]);
  
  // Handle local state changes
  const handleLocalTextChange = (e) => {
    setLocalTextBuf(e.target.value);
  }

  // Handle save to main state
  const handleSaveState = () => {
    // Save if changes made
    if(localTextBuf.trim() !== procText.trim()) {
      setProcText(localTextBuf);
    }
    onClose();
  }

  // Only render on open state
  if (!isOpen) return null;

  return (
    <div className="preprocessor-dialog">
      <div className="preprocessor-content">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <h4 className="text-xl text-roboto text-default-white"><b>Pre-Processor</b></h4>
          <div>
              <button className='btn btn-outline-success mr-2' onClick={handleSaveState}>
                <span className='text-default-white'>
                  Save <FaRegSave size={14} />
                </span>
              </button>
             <button className="btn btn-outline-danger ml-2" onClick={onClose}>
              <IoCloseSharp size={14} />
            </button>           
          </div>
        </div>
        <div>
          <p className='text-lg text-default-white text-roboto'>View and edit the raw pre-processor code</p>
          <textarea value={localTextBuf} onChange={handleLocalTextChange} className="form-control" rows="15" id="proc" ></textarea>
        </div>
      </div>
    </div>
  );
}
export default Preprocessor