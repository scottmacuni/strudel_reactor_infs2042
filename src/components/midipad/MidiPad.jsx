import { useState, useEffect } from 'react'
import MidiGrid from './MidiGrid'
import MuteRadioBtn from './MuteRadioBtn'
import {initStrudel, samples, s, hush, evaluate, fast, take, play, stop}  from "@strudel/web"
import { FaCircleStop } from "react-icons/fa6";

// The midi pad controller component left of the Strudel REPL
// Allows for single sounds to be played with the midi pad outside of the REPL code
function MidiPad({
  instrumentStates,
  updateInstrumentState
}) {
  const [soundsInit, setSoundsInit] = useState(false)
  const [tempo, setTempo] = useState(60)
  const [isLooping, setIsLooping] = useState(false)
  const [mode, setMode] = useState("single")
  const [loopedSounds, setLoopedSounds] = useState([])
  
  // Init strudel and fetch samples
  useEffect(() => {
     initStrudel({
        prebake: () => samples('github:tidalcycles/dirt-samples'),
      });
      setSoundsInit(true)
  }, [])

  function playSound(abbvr) {
    if(mode === "single"){
      playSoundSingle(abbvr)
    } else {
      // Add to looped sounds to dynamically build patters
      setLoopedSounds((prev) => {
        const updated = [...prev, abbvr];
        playSoundLoop(updated); // pass the updated array directly due to React async update
        return updated;
      });
      setIsLooping(true);
    }}

  function playSoundSingle(abbvr) {
    console.log("playing single: ", abbvr);
    const sound = s(`${abbvr}`).play();
    setTimeout(() => {
      if(sound){
        hush()
      }
    }
    , 100)
  }

  function playSoundLoop(sounds){
    console.log("playing loop: ", sounds);
    const pattern = sounds.join(" ");
    evaluate(`
      setcpm(${tempo})
      s("${pattern}")       
    `)
  }

  function stopSounds(){
    hush()  // mute all
    setLoopedSounds([]) // clear pattern
    setIsLooping(false) // change state
  }

  return (
    <div className='bg-dark h-full w-full'>
        <div className="row">
          <div className='col-3'>
            <div className='mt-2 mb-2 container'>
              {/* Link radio buttons to global state by id ref */}
              {[1, 2, 3, 4].map(id => (
                <MuteRadioBtn
                  key={id}
                  instrumentId={id}
                  isMuted={instrumentStates[id]}
                  muteInstrument={updateInstrumentState} 
                />
              ))}
            </div>
          </div>
          <div className="col">
            <div className='midi-controls'>
              <div className='midi-control-options mt-2'>
                <label className='text-md text-default-white w-1-3 mb-1'>Midi Pad Mode:</label>
                <label className='text-md text-default-white w-1-3 mb-1 ml-2' >Tempo CPM: {tempo.toString()}</label>
              </div>
              <div className='midi-control-options'>
                <select 
                  value={mode} 
                  id='mode-select' 
                  className='form-control'
                  onChange={(e) => setMode(e.target.value)}
                >
                  <option value="single">Single Beat</option>
                  <option value="loop">Loop</option>
                </select>
                <input 
                  id='tempo-select' 
                  type='range' 
                  className='form-range mt-1'
                  defaultValue={60}
                  min={10} 
                  max={200}
                  onChange={(e) => setTempo(e.target.value)}
                />
                <button disabled={!isLooping} className='btn btn-outline-danger' onClick={stopSounds}><FaCircleStop size={20}/></button>
              </div>

            </div>
            <div className='midi-btn-container bg-dark p-2'>
              <MidiGrid
                playSound={playSound}
              />
            </div>
          </div>
        </div>
    </div>
  )
}

export default MidiPad


   {/*        <div className="row">
            <div className="col-md-8">
              <div id="editor" />
            </div>
            <div className="col-md-4">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"  defaultChecked />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  p1: ON
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  p1: HUSH
                </label>
              </div>
            </div>
          </div> */}