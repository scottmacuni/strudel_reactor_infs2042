import MidiGridButton from './MidiGridButton'
import { midipadInstruments } from '../../lib/instruments'

function MidiGrid({
  playSound
}) {
  const instruments = midipadInstruments;

  return (
    <div className='w-full container'>
      <div className='row'>
      {instruments.map((instrument, idx) => (
        <div key={idx} className='col-3 mb-3'>
        <MidiGridButton
          idx={idx}
          label={instrument.label}
          playSound={playSound}
          sound={instrument.abbvr}
        />
        </div>
      ))}
      </div>
      </div>

  )
}

export default MidiGrid