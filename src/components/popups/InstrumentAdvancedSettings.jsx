import { IoCloseSharp } from "react-icons/io5";
import { drums } from "../../lib/instruments";

// Provides a range of advanced settings beyond mute and LPF modifications to change how REPL instruments sound
// Hidden by default but acts as a pop-up if the user wants to see the pre-processed code and edit manually
function InstrumentAdvancedSettings({ 
  isOpen, 
  onClose,
  drum,
  setDrum,
  instrumentSpeed,
  setInstrumentSpeed,
}) {

  const drumOptions = drums;

  // Only render on open state
  if (!isOpen) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <h4 className="text-xl text-roboto text-default-white"><b>Advanced Instrument Settings</b></h4>
          <div>
             <button className="btn btn-outline-danger ml-2" onClick={onClose}>
              <IoCloseSharp size={14} />
            </button>           
          </div>
        </div>
        <div>
          <p className='text-lg text-default-white text-roboto'>Apply effects to the REPL instruments</p>
          <div className='container mt-2 w-full h-full p-2'>
            <div className='flex flex-row mb-3'>
              <p className='text-default-white text-roboto text-lg mr-3 mt-3'>Default drum:</p>
               <select 
                  value={drum}
                  id="drum-select"
                  className="form-control"
                  style={{width: "30%"}}
                  onChange={(e) => setDrum(e.target.value)} 
              >
                {drumOptions.map((drum, idx) => (
                  <option key={idx} value={drum}>{drum}</option>
                ))}
              </select>         
            </div>

            <p className='text-default-white text-roboto text-lg mr-3 mt-5'>Instrument Playback Speed</p>
            <div className='flex flex-row justify-center mt-2 gap-3'>
              {[1, 2, 3, 4].map(id => (
                <div className='w-full' key={id}>
                  <p className='text-default-white text-md mr-2'>{id}:</p>
                  <select 
                    className="form-control"
                    onChange={(e) => setInstrumentSpeed(id, e.target.value)}
                    value={instrumentSpeed[id]}
                  >
                    <option value={1}>Default (1x)</option>
                    <option value={0.5}>Half (0.5x)</option>
                    <option value={2}>Double (2x)</option>
                </select>   
              </div>
              ))}
      
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InstrumentAdvancedSettings;