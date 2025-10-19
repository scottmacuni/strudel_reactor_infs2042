import MidiGrid from './MidiGrid'
import MuteRadioBtn from './MuteRadioBtn'

// The midi pad controller component left of the Strudel REPL
// Allows for single sounds to be played with the midi pad outside of the REPL code
function MidiPad() {
  return (
    <div className='bg-surface h-full w-full'>
      <div>
        <div className="row">
           <div className="col">
              Top controls
          </div>
        </div>
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
            <div className='midi-btn-container bg-dark p-2'>
              <MidiGrid />
            </div>
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