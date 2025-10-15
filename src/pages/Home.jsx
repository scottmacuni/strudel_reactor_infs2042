import React, { useEffect, useState } from 'react'
import Preprocessor, {Proc} from '../components/Preprocessor'; 
import StrudelREPL from '../components/StrudelREPL';
import { RiMusicAiFill } from "react-icons/ri"; // Insalled react-icons npm lib
import GlobalOptions from '../components/GlobalOptions';
import MidiPad from '../components/MidiPad';

// Main home page rendered in App.tsx which structures the  React SPA
function Home() {

    // Global states
    const [play, setPlay] = useState(false);


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
        <div className="w-full">
            <GlobalOptions setPlay={setPlay} />
          {/* Pre-Processor */}
          {/* <Preprocessor globalEditor={globalEditor}/> */}

          <div className='flex flex-row'>
            <StrudelREPL playState={play}/>
            <MidiPad />
          </div>

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