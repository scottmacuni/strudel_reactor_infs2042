import { useState } from 'react'
import StrudelREPL from '../components/StrudelREPL';
import { RiMusicAiFill } from "react-icons/ri"; // Insalled react-icons npm lib
import GlobalOptions from '../components/GlobalOptions';
import MidiPad from '../components/midipad/MidiPad';
import Preprocessor from '../components/popups/Preprocessor';
import {stranger_tune, custom_tune} from "../lib/tunes";
import { Proc } from '../lib/helpers';
import InstrumentAdvancedSettings from '../components/popups/InstrumentAdvancedSettings';
import ExportDialog from '../components/popups/ExportDialog';
import ImportDialog from '../components/popups/ImportDialog';
import Notification from '../components/popups/Notification';
import Visualizer from '../components/popups/Visualizer';
import { PiDiscoBallFill } from "react-icons/pi";

// Main home page rendered in App.tsx which structures the  React SPA
function Home() {

    // Global states
    const [isPlaying, setIsPlaying] = useState(false);  // main REPL is playing
    const [procText, setProcText] = useState(custom_tune);  // current text shared between proc and repl

    // Popup states
    const [showProcessor, setShowProcessor] = useState(false);  // processor pop-up shown
    const [showAdvancedSettings, setShowAdvancedSettings] = useState(false); // setting pop-up show
    const [showExportDialog, setShowExport] = useState(false); // export midi pad loop pop-up show
    const [showImportDialog, setShowImport] = useState(false); // import midi pad loop pop-up show
    const [showNotification, setShowNotification] = useState(false) // notification pop-up
    const [showVisualizer, setShowVisualizer] = useState(false) // D3 visualizer
    const [notificationMsg, setMessage] = useState("")

    // Midi pad states
    const [isLooping, setIsLooping] = useState(false) // midi pad is looping sounds
    const [layers, setLayers] = useState(["", "", "", "", "", ""]); // different sound loop layers to play simultaneously
    const [tempo, setTempo] = useState(35)  // CPM tempo

    // Instrument states on/off based on radio button selection in MidiPad -> MuteRadioBtn
    // False is default state and indicates not muted
    const [instrumentStates, setInstrumentStates] = useState({
      1: false,
      2: false,
      3: false,
      4: false
    });
  
    const [instrumentLPF, setInstrumentLPF] = useState({
      1: 700,
      2: 300,
      3: 7000,
      4: 1000
    });

    // Gets the settings used in the Proc function to mute or allow
    const getInstrumentSettings = () => {
      const settings = {
        "states": instrumentStates,
        "lpf": instrumentLPF 
      }
      return settings
    }

    // Updates a single instrument state based on id from child componets
    const updateInstrumentState = (id, state) => {
      setInstrumentStates(currentState => ({...currentState, [id]: state}));
    }

    // Updates a single instrument state based on id from child componets
    const updateInstrumentLPF = (id, lpf) => {
     setInstrumentLPF(currentLPF => ({...currentLPF, [id]: lpf}));
    }

    // State toggles
    const togglePlay = (state) => {
        setIsPlaying(state);
    }

    // Processes text to handle custom prefixes before setting to REPL
    function proc(preProcText, settings=getInstrumentSettings()){
      return Proc(preProcText, settings);
    }

  return (
     <>
      {/* Preprocessor hidden but opens as a popup dialog */}
      <Preprocessor 
        isOpen={showProcessor} 
        onClose={() => setShowProcessor(false)}
        procText={procText}
        setProcText={setProcText}
        setMessage={setMessage}
        setShowNotification={setShowNotification}
      />
      
      {/* Advanced settings hidden but opens as a popup dialog */}
      <InstrumentAdvancedSettings 
        isOpen={showAdvancedSettings} 
        onClose={() => setShowAdvancedSettings(false)}
      />
      
      {/* Export and import dialogs to save to local storage */}
      <ExportDialog
        isOpen={showExportDialog}
        onClose={() => setShowExport(false)}
        currentLayers={layers}
        currentTempo={tempo}
        setMessage={setMessage}
        setShowNotification={setShowNotification}
      />
      <ImportDialog
        isOpen={showImportDialog}
        onClose={() => setShowImport(false)}
        setLayers={setLayers}
        setMessage={setMessage}
        setShowNotification={setShowNotification}
      />

      {/* Temporary pop up notifications */}
      <Notification
        isOpen={showNotification}
        onClose={() => setShowNotification(false)}
        message={notificationMsg}
      />

      {/* Full screen visualizer */}
      <Visualizer
        isOpen={showVisualizer}
        onClose={() => setShowVisualizer(false)}
        isPlaying={isPlaying}
      />

      {/* Header */}
      <header className="w-full d-flex flex-row text-left text-audiowide bg-dark p-2 fixed-top justify-items-between">
        <div className='flex flex-row w-90'>
          <h1 className="text-accent ml-3 mr-2">Strudel Reactor</h1>
          <RiMusicAiFill size={42} className="ml-2 mt-1" fill="#DBF227" /> 
        </div>
            <PiDiscoBallFill className="visualizer-trigger" onClick={() => setShowVisualizer(true)} size={42} fill="#DBF227" /> 
      </header>

      {/* Main Content */}
      <main className="app-main">
        <div className="global-options">
          <GlobalOptions 
            isPlaying={isPlaying} 
            togglePlayState={togglePlay}
            showProcessor={setShowProcessor}
            showAdvancedSettings={setShowAdvancedSettings}
            showExportDialog={setShowExport}
            showImportDialog={setShowImport}
            isLooping={isLooping}
            setIsLooping={setIsLooping}
            setLayers={setLayers}
            setMessage={setMessage}
            setShowNotification={setShowNotification}
          />
        </div>

        <div className="d-flex flex-row flex-fill app-content">
          {/* Left Panel Strudel REPL*/}
          <div className="repl-panel">
            <StrudelREPL
              isPlaying={isPlaying} 
              procText={procText}
              instrumentStates={instrumentStates}
              instrumentLPF={instrumentLPF}
              proc={proc}
            />
          </div>

          {/* Right Panel MidiPad */}
          <div className="midi-panel">
            <MidiPad
              instrumentStates={instrumentStates}
              updateInstrumentState={updateInstrumentState}
              instrumentLPF={instrumentLPF}
              updateInstrumentLPF={updateInstrumentLPF}
              isLooping={isLooping}
              setIsLooping={setIsLooping}
              layers={layers}
              setLayers={setLayers}
              tempo={tempo}
              setTempo={setTempo}
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