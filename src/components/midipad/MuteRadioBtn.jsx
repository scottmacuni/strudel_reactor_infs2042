import React, {useState} from 'react'
import { AiFillSound } from "react-icons/ai";
import { IoVolumeMute } from "react-icons/io5";

// Acts as a intrument radio on/off state button
function MuteRadioBtn({instrumentId}) {

    const [muted, setMuted] = useState(false)
  return (
    <div className='justify-cnter text-center'>
    <p className='text-lg text-default-white text-roboto mb-0'>{instrumentId}</p>
     <div className="switch-container d-inline-flex border rounded-pill overflow-hidden">
      <label className="flex-fill text-center m-0">
        <input
          type="radio"
          name="switch"
          value="on"
          checked={!muted}
          onChange={() => setMuted(false)}
          className="d-none"
        />
        <span className={`switch-option ${!muted ? "active" : ""}`}>
            <AiFillSound size={20} />
        </span>
      </label>

      <label className="flex-fill text-center m-0">
        <input
          type="radio"
          name="switch"
          value="off"
          checked={muted}
          onChange={() => setMuted(true)}
          className="d-none"
        />
        <span className={`switch-option ${muted ? "active" : ""}`}>
            <IoVolumeMute  size={20}/>
        </span>
      </label>
    </div>
    
    </div>
     )
}

export default MuteRadioBtn