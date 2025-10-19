import React from 'react'

function MidiGridButton({
  color,
  label,
  playSound,
  sound,
  idx
}) {
  function triggerSound(){
    playSound(sound)
  }
  return (
    <div className='bg-accent col'>
        <div className='row p-2'>
            <button  onClick={triggerSound} className='midi-btn'>BTN</button>
        </div>
        <div className='row'>
            <label className='text-md text-default-white text-audiowide'>{label}</label>
        </div>
    </div>
  )
}

export default MidiGridButton