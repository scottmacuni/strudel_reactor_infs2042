import MidiGrid from './MidiGrid'
import MuteRadioBtn from './MuteRadioBtn'

// The midi pad controller component left of the Strudel REPL
// Allows for single sounds to be played with the midi pad outside of the REPL code
function MidiPad() {
  return (
    <div className='bg-dark h-full w-full'>
        <div className="row">
          <div className='col-3'>
            <div className='mt-2 mb-2 container'>
              <MuteRadioBtn instrumentId={"drums"} /><br/>
              <MuteRadioBtn instrumentId={"guitar"} /><br/>
              <input type='range'></input>
              <input type='range'></input>
              <input type='range'></input>
            </div>
          </div>
          <div className="col">
            <div className='midi-controls'>
              <div className='midi-control-options mt-2'>
                <label for="mode-select" className='text-md text-default-white w-1-2 mb-1'>Midi Pad Mode:</label>
                <label for="speed-select" className='text-md text-default-white w-1-2 mb-1' >Playback speed:</label>
              </div>
              <div className='midi-control-options'>
                <select name='mode-select' className='form-control'>
                  <option value="single">Single Beat</option>
                  <option value="loop">Loop</option>
                </select>
                <select name='speed-select' className='form-control'>
                  <option value="single">Single Beat</option>
                  <option value="loop">Loop</option>
                </select>
              </div>

            </div>
            <div className='midi-btn-container bg-dark p-2'>
              <MidiGrid />
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