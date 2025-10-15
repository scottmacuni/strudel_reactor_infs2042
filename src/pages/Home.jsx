import React, { useState } from 'react'
import Preprocessor, {Proc} from '../components/Preprocessor'; 
import StrudelREPL from '../components/StrudelREPL';


// Main home page rendered in App.tsx which structures the  React SPA
function Home() {

    const [globalEditor, setGlobalEditor] = useState(null);

  return (
    <div>
      <h2>Strudel Demo</h2>
      <main>
        <div className="container-fluid">
          {/* Pre-Processor */}
          <Preprocessor globalEditor={globalEditor}/>

          <div className="row">
            {/* BTNs */}
            <div className="col-md-4">
              <nav>
                <button id="process" className="btn btn-outline-primary">Preprocess</button>
                <button id="process_play" className="btn btn-outline-primary">Proc & Play</button>
                <br />
                <button id="play" className="btn btn-outline-primary">Play</button>
                <button id="stop" className="btn btn-outline-primary">Stop</button>
              </nav>
            </div>
          </div>
          {/* REPL */}
          <StrudelREPL setEditor={setGlobalEditor} />
          <div className="row">
            <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
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
          </div>
        </div>

      </main >
    </div >
  )
}

export default Home;