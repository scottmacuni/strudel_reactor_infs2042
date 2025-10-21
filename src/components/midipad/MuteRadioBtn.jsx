import React, {useState} from 'react'
import { AiFillSound } from "react-icons/ai";
import { IoVolumeMute } from "react-icons/io5";

// Acts as a intrument radio on/off state button
function MuteRadioBtn({
  instrumentId,                  
  isMuted,
  muteInstrument 
}) {
  return (
    <div className='text-center mb-2'>
    <p className='text-lg text-accent text-audiowide mb-1'>{instrumentId.toString()}</p>
     <div className="switch-container d-inline-flex border rounded-pill overflow-hidden">
      <label className="flex-fill text-center m-0">
        <input
          type="radio"
          name="switch"
          checked={!isMuted}
          onChange={() => muteInstrument(instrumentId, false)}
          className="d-none"
        />
        <span className={`switch-option ${!isMuted ? "active" : ""}`}>
            <AiFillSound size={20} />
        </span>
      </label>

      <label className="flex-fill text-center m-0">
        <input
          type="radio"
          name="switch"
          checked={isMuted}
          onChange={() => muteInstrument(instrumentId, true)}
          className="d-none"
        />
        <span className={`switch-option ${isMuted ? "active" : ""}`}>
            <IoVolumeMute  size={20}/>
        </span>
      </label>
    </div>
    <div className='w-80 m-auto mt-2'>
     <input 
      type='range' 
      className='form-range'
      defaultValue={50}
      min={0} 
      max={100}
      onChange={(e) => console.log(e.target.value)}
    />     
    </div>
    </div>
  )
}

export default MuteRadioBtn