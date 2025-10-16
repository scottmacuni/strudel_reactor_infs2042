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
        <header className='w-full flex flex-row text-left text-audiowide bg-dark p-2'>
            <h1 className='text-accent ml-2'>Strudel Reactor</h1>
            {/* Music icon from react-icons lib */}
            <RiMusicAiFill size={42} className='ml-2' fill='#DBF227'/>
        </header>
        {/* Main SPA */}
      <main>
        <div className="w-full h-full">
            <GlobalOptions isPlaying={isPlaying} togglePlayState={togglePlay} />
          <div className='flex flex-row h-full'>
            <StrudelREPL isPlaying={isPlaying}/>
            <MidiPad />
          </div>

        </div>
      </main >
      {/* Footer */}
        <footer className='w-full bg-dark text-center p-2'>
            <p className='text-lg text-roboto text-default-white'>INFS 2042 ------ Scott MacDonald ------ MACSY039</p>
        </footer>
    </>
    )
}

export default Home;