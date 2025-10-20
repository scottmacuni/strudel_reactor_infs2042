import React, { useEffect, useState } from 'react'
import MidiGridButton from './MidiGridButton'
import {initStrudel, samples, s, hush, take, play, stop}  from "@strudel/web"
import { midipadInstruments } from '../../lib/instruments'

function MidiGrid() {
  const [soundsInit, setSoundsInit] = useState(false)
  const [instruments, setInstruments] = useState(midipadInstruments)

  useEffect(() => {
     initStrudel({
        prebake: () => samples('github:tidalcycles/dirt-samples'),
      });
      setSoundsInit(true)
  }, [])

  function playSoundSingle(abbvr) {
    console.log("playing: ", abbvr);
    const sound = s(`${abbvr}`).play();
    setTimeout(() => {
      if(sound){
        hush()
      }
    }
    , 100)
  }


  return (
    <div className='w-full container'>
      <div className='row'>
      {instruments.map((instrument, idx) => (
        <div key={idx} className='col-3 mb-3'>
        <MidiGridButton
          idx={idx}
          label={instrument.label}
          playSound={playSoundSingle}
          sound={instrument.abbvr}
        />
        </div>
      ))}
      </div>
      </div>

  )
}

export default MidiGrid