import React from 'react'

function ImportDialog({
    isOpen,
    onClose,
    setLayers
}) {
    // Only render on open state
  if (!isOpen) return null;

  return (
    <div className="popup">
      <div className="popup-content-sm">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <h4 className="text-xl text-roboto text-default-white"><b>Import Sound Loop</b></h4>
          <div>
              <button className='btn btn-outline-success mr-2' onClick={""}>
                <span className='text-default-white'>
                </span>
              </button>
             <button className="btn btn-outline-danger ml-2" onClick={onClose}>
            </button>           
          </div>
        </div>
        <div>
          <p className='text-lg text-default-white text-roboto'>Import a custom loop from local storage</p>
        </div>
      </div>
    </div>
  );
}

export default ImportDialog