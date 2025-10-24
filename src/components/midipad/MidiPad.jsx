import { useState, useEffect } from 'react'
import MidiGrid from './MidiGrid'
import MuteRadioBtn from './MuteRadioBtn'
import {initStrudel, samples, s, hush, evaluate}  from "@strudel/web"
import { FaCircleStop } from "react-icons/fa6";

// TODO: see if you can get this to work
/*   function cacheSamples() {
    console.log("prefetching midi samples... ")
    evaluate(`
      s("bd sd hh cp cr ht mt lt cb perc supersaw sawtooth").hush()   
    `)
      setTimeout(() =>{ 
          hush()
      }
      , 50) 
  } */

// The midi pad controller component left of the Strudel REPL
// Allows for single sounds to be played with the midi pad outside of the REPL code
function MidiPad({
  instrumentStates,
  updateInstrumentState,
  instrumentLPF,
  updateInstrumentLPF
}) {
  const [soundsInit, setSoundsInit] = useState(false) // sounds fetched and strudel loaded
  const [tempo, setTempo] = useState(60)  // CPM tempo
  const [isLooping, setIsLooping] = useState(false) // if sound should be looping
  const [mode, setMode] = useState("single")  // single beat or looped beat mode for midi pad
  
  // Sound states for looped beat construction
  const [layers, setLayers] = useState(["", "", ""]); // different sound loop layers to play simultaneously
  const [currentLayer, setCurrentLayer] = useState(0);  // the current layer being edited

  // Init strudel and fetch samples
  useEffect(() => {
     initStrudel({
        prebake: () => samples('github:tidalcycles/dirt-samples'),
      });
      // cacheSamples()
      setSoundsInit(true)

  }, [])

  // Play the sound loop when a new layer is modified
  useEffect(() => {
    console.log("layers updated, playing sound loop..")
    playSoundLoop()
  }, [layers])

  // Appends a sound to the current layer selected
  function addSoundToLayer(abbvr) {
    // Update state
    setLayers(prev => {
      const currentPattern = layers[currentLayer] // get current layer pattern
      let newPattern;

      // If existing pattern to append to end
      if(currentPattern){
        newPattern = `${currentPattern.trim()} ${abbvr.trim()}` // append sound
      } else {
        // else the pattern is simply the new sound
        newPattern = abbvr.trim()
      }

      const updatedLayers = [...prev] // reference to update
      updatedLayers[currentLayer] = newPattern // update reference to new pattern
      return updatedLayers  // return the update state
    })
  }

  // Triggered by midi pad buttons
  function playSound(abbvr) {

    // Single sound mode
    if(mode === "single"){
      playSoundSingle(abbvr)
    } else {
      // Add to looped sounds to dynamically build patterns in the 3 layers
      addSoundToLayer(abbvr)
      setIsLooping(true);
    }}
  
  // Single sound emit followed by hush
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

  // Plays the layered sounds in a stacked pattern
  function playSoundLoop(){
    console.log("current layers: ", layers)
    if (!layers) return;

    
    // For each sound layer, build the sound pattern for the evaluate method
    const layersWithSounds = layers.filter(layer => layer.trim() !== "") // only get layers with sounds
    if(!layersWithSounds || layersWithSounds.length === 0) return;  // validate

    // First sound is just s(pattern), remaining are stacked .stack(s(pattern))
    const soundPatterns = layersWithSounds.map((layer, idx) => (idx === 0 ? `s("${layer}")` : `.stack(s("${layer}"))`)).join("")
    console.log("playing loop of layers:\n ", soundPatterns)

    // Play
    evaluate(`
      setcpm(${tempo})
      ${soundPatterns}
    `)
  }

  // Stops all sounds and resets states
  function stopSounds(){
    hush()  // mute all
    setLayers(["", "", ""]) // clear layers
    setIsLooping(false) // change state
  }

  return (
    <div className='bg-dark h-full w-full'>
        <div className="row">
          <div className='col-3'>
            <div className='mt-2 mb-2 container text-center'>
              
              <label className='text-md text-default-white mb-2'>REPL Instruments</label>
              {/* Link radio buttons to global state by id ref */}
              {[1, 2, 3, 4].map(id => (
                <MuteRadioBtn
                  key={id}
                  instrumentId={id}
                  isMuted={instrumentStates[id]}
                  muteInstrument={updateInstrumentState}
                  LPF={instrumentLPF[id]}
                  updateLPF={updateInstrumentLPF} 
                />
              ))}
            </div>
          </div>
          <div className="col">
            <div className='midi-controls'>
              <div className='midi-control-options mt-2'>
                  <label className='text-md text-default-white mb-1'>Midi Pad Mode:</label>
                  <label className='text-md text-default-white' >Tempo CPM: {tempo.toString()}</label>
                  <label className='text-md text-default-white mr-3' >Stop</label>
                </div>
              <div className='midi-control-options'>
                
                <select 
                  value={mode} 
                  id='mode-select' 
                  className="form-control"
                  style={{width: "50%"}} 
                  onChange={(e) => setMode(e.target.value)}
                >
                  <option value="single">Single Beat</option>
                  <option value="loop">Loop</option>
                </select>
                
                {mode === "loop" && (
                  <select 
                    id='layer-select' 
                    className='form-control'
                    style={{width: "20%"}}
                    value={currentLayer}
                    onChange={(e) => setCurrentLayer(e.target.value)}
                  >
                    <option value={0}>1</option>
                    <option value={1}>2</option>
                    <option value={2}>3</option>
                  </select>                  
                )}
                
                <input 
                  id='tempo-select' 
                  type='range' 
                  className='form-range mt-1'
                  defaultValue={60}
                  min={10} 
                  max={180}
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