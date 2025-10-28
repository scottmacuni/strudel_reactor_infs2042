import { useEffect, useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";

// Full screen visualizer pop-up that shows sound wave forms
function Visualizer({ 
  isOpen, 
  onClose, 
}) {

  // Only render on open state
  if (!isOpen) return null;

  return (
    <div className="popup-visualizer">
      <div className="popup-content-visualizer">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <h4 className="text-xl text-roboto text-default-white"><b>Visualizer</b></h4>
          <div>
             <button className="btn btn-outline-danger ml-2" onClick={onClose}>
              <IoCloseSharp size={14} />
            </button>           
          </div>
        </div>
        <div>
            {/* Visualiser D3 */}
        </div>
      </div>
    </div>
  );
}
export default Visualizer