import { useState } from 'react'
import StrudelREPL from '../components/StrudelREPL';
import { RiMusicAiFill } from "react-icons/ri"; // Insalled react-icons npm lib
import GlobalOptions from '../components/GlobalOptions';
import MidiPad from '../components/midipad/MidiPad';
import Preprocessor from '../components/Preprocessor';
import {stranger_tune} from "../lib/tunes";
import { Proc } from '../lib/helpers';

// Main home page rendered in App.tsx which structures the  React SPA
function Home() {

    // Global states
    const [isPlaying, setIsPlaying] = useState(false);  // main REPL is playing
    const [showProcessor, setShowProcessor] = useState(false);  // pop-up shown
    const [procText, setProcText] = useState(stranger_tune);  // current text shared between proc and repl

    // Instrument states on/off based on radio button selection in MidiPad -> MuteRadioBtn
    // False is default state and indicates not muted
    const [instrumentStates, setInstrumentStates] = useState({
      1: false,
      2: false,
      3: false,
      4: false
    });

    // Gets the states used in the Proc function to mute or allow
    const getInstrumentState = () => {
      return instrumentStates
    }

    // Updates a single instrument state based on id from child componets
    const updateInstrumentState = (id, state) => {
      console.log("changing: ", id, " to: ", state)
      setInstrumentStates(currentState => ({...currentState, [id]: state}));
    }

    // State toggles
    const togglePlay = (state) => {
        console.log("Play state change: ", state)
        setIsPlaying(state);
    }

    // Processes text to handle custom prefixes before setting to REPL
    function proc(preProcText, states=instrumentStates){
      console.log("proc... ", states);
      return Proc(preProcText, states);
    }

  return (
     <>
      {/* Preprocessor hidden but opens as a popup dialog */}
      <Preprocessor 
        isOpen={showProcessor} 
        onClose={() => setShowProcessor(false)}
        procText={procText}
        setProcText={setProcText}
      />
      {/* Header */}
      <header className="w-full d-flex flex-row text-left text-audiowide bg-dark p-2 fixed-top">
        <h1 className="text-accent ms-2">Strudel Reactor</h1>
        <RiMusicAiFill size={42} className="ms-2" fill="#DBF227" />
      </header>

      {/* Main Content */}
      <main className="app-main">
        <div className="global-options">
          <GlobalOptions 
            isPlaying={isPlaying} 
            togglePlayState={togglePlay}
            showProcessor={setShowProcessor}
          />
        </div>

        <div className="d-flex flex-row flex-fill app-content">
          {/* Left Panel Strudel REPL*/}
          <div className="repl-panel">
            <StrudelREPL
              isPlaying={isPlaying} 
              procText={procText}
              instrumentStates={instrumentStates}
              proc={proc}
            />
          </div>

          {/* Right Panel MidiPad */}
          <div className="midi-panel">
            <MidiPad
              instrumentStates={instrumentStates}
              updateInstrumentState={updateInstrumentState}
            />
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="w-full bg-dark text-center p-2 fixed-bottom">
        <p className="text-lg text-roboto text-default-white m-0">
          INFS 2042 —— Scott MacDonald —— MACSY039
        </p>
      </footer>
    </>
  )
}

export default Home;