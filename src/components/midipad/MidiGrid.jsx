import MidiGridButton from './MidiGridButton'

function MidiGrid() {
  return (
    <div className='w-full grid gap-3'>
        <div className='row'>
          <MidiGridButton />
          <MidiGridButton />
          <MidiGridButton />
        </div>
        <div className='row'>
          <MidiGridButton />
          <MidiGridButton />

          <MidiGridButton />
        </div>
        <div className='row'>
          <MidiGridButton />
          <MidiGridButton />
          <MidiGridButton />
        </div>

      </div>

  )
}

export default MidiGrid