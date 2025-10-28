import React, { useEffect } from 'react'

function Notification({
    isOpen,
    onClose,
    message,
}) {
    // Automatically close after 2.5 seconds
    useEffect(() => {
        if(isOpen){
            setTimeout(() => {
                onClose()
            }, 2500)
        }
    }, [isOpen])

    // Only render on open state
    if (!isOpen || !message) return null;
  return (
    <div className="popup-notify">
      <div className="popup-content-notify">
          <p className="text-lg text-roboto text-default-white text-center"><b>{message}</b></p>
      </div>
    </div>
  );
}

export default Notification