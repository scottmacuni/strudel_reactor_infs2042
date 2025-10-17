import React from 'react'

function MidiGridButton({color}) {
  return (
    <div className='bg-accent col'>
        <div className='row p-2'>
            <button className='midi-btn'>BTN</button>
        </div>
        <div className='row'>
            <label className='text-md text-default-white'>Label</label>
        </div>
    </div>
  )
}

export default MidiGridButton