import React, { useEffect, useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { FaRegSave } from "react-icons/fa";

// Provides a range of advanced settings beyond mute and LPF modifications to change how REPL instruments sound
// Hidden by default but acts as a pop-up if the user wants to see the pre-processed code and edit manually
function InstrumentAdvancedSettings({ 
  isOpen, 
  onClose, 
}) {
    // Handle save to main global state
  const handleSaveState = () => {
    onClose();
  }

  // Only render on open state
  if (!isOpen) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <h4 className="text-xl text-roboto text-default-white"><b>Advanced Instrument Settings</b></h4>
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
          <p className='text-lg text-default-white text-roboto'>Apply effects to the REPL instruments</p>
        </div>
      </div>
    </div>
  );
}
export default InstrumentAdvancedSettings;