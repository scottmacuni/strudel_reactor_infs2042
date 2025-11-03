import React, {useState} from 'react'
import { AiFillSound } from "react-icons/ai";
import { IoVolumeMute } from "react-icons/io5";

// Acts as a intrument radio on/off state button
function MuteRadioBtn({
  instrumentId,                  
  isMuted,
  muteInstrument ,
  LPF,
  updateLPF,
}) {
  return (
    <div className='text-center mb-2'>
    <p className='text-lg text-accent text-audiowide mb-1'>ID: {instrumentId.toString()}</p>
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
    <div className='w-3-4 m-auto mt-2 flex'>
      <label className='text-md text-default-white mt-2 mr-2 '>LPF: </label>
     <input 
      type='number' 
      className='lpf-input ml-2 mt-1 bg-dark text-default-white'
      defaultValue={LPF}
      min={0}
      max={8000}
      onChange={(e) => updateLPF(instrumentId, e.target.value)}
    />     
    </div>
    </div>
  )
}

export default MuteRadioBtn