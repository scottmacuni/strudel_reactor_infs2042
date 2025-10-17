import React, { useEffect, useState } from 'react'
import StrudelREPL from '../components/StrudelREPL';
import { RiMusicAiFill } from "react-icons/ri"; // Insalled react-icons npm lib
import GlobalOptions from '../components/GlobalOptions';
import MidiPad from '../components/midipad/MidiPad';

// Main home page rendered in App.tsx which structures the  React SPA
function Home() {

    // Global states
    const [isPlaying, setIsPlaying] = useState(false);

    // State toggles
    const togglePlay = (state) => {
        console.log("Play state change: ", state)
        setIsPlaying(state);
    }

  return (
     <>
      {/* Header */}
      <header className="w-full d-flex flex-row text-left text-audiowide bg-dark p-2 fixed-top">
        <h1 className="text-accent ms-2">Strudel Reactor</h1>
        <RiMusicAiFill size={42} className="ms-2" fill="#DBF227" />
      </header>

      {/* Main Content */}
      <main className="app-main">
        <div className="global-options">
          <GlobalOptions isPlaying={isPlaying} togglePlayState={togglePlay} />
        </div>

        <div className="d-flex flex-row flex-fill app-content">
          {/* Left Panel Strudel REPL*/}
          <div className="repl-panel">
            <StrudelREPL isPlaying={isPlaying} />
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