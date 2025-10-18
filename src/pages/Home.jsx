import React, { useEffect, useState } from 'react'
import StrudelREPL from '../components/StrudelREPL';
import { RiMusicAiFill } from "react-icons/ri"; // Insalled react-icons npm lib
import GlobalOptions from '../components/GlobalOptions';
import MidiPad from '../components/midipad/MidiPad';
import Preprocessor from '../components/Preprocessor';
import {stranger_tune} from "../lib/tunes";

// Main home page rendered in App.tsx which structures the  React SPA
function Home() {

    // Global states
    const [isPlaying, setIsPlaying] = useState(false);
    const [showProcessor, setShowProcessor] = useState(false);
    const [procText, setProcText] = useState(stranger_tune)


    // State toggles
    const togglePlay = (state) => {
        console.log("Play state change: ", state)
        setIsPlaying(state);
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
            />
          </div>

          {/* Right Panel MidiPad */}
          <div className="midi-panel">
            <MidiPad />
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