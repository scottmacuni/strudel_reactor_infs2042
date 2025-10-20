import React from 'react'

function MidiGridButton({
  label,
  playSound,
  sound,
  idx
}) {
  function triggerSound(){
    playSound(sound)
  }
  const btnColours = ["midi-btn-purple", "midi-btn-yellow", "midi-btn-blue"];
  return (
    <div className='bg-accent col'>
        <div className='row p-2'>
            <button onClick={triggerSound} className={`midi-btn ${btnColours[idx % 3]}`}></button>
        </div>
        <div className='row'>
            <label className='text-md text-default-white text-audiowide text-center'>{label}</label>
        </div>
    </div>
  )
}

export default MidiGridButton