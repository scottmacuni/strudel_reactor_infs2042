import { FaPlay } from "react-icons/fa";
import { FaCircleStop } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { LuDrum } from "react-icons/lu";
import { BiReset } from "react-icons/bi";

// Contains global options for SPA, in a nav bar like design
function GlobalOptions({
    isPlaying,
    togglePlayState,
    showProcessor,
    showAdvancedSettings,
    isLooping,
    setIsLooping,
    setLayers
}) {

  // Resets/clears sounds for fresh template
  function stopLoopAndClear() {
    setIsLooping(false)
    setLayers(["", "", "", "", "", ""]) // clear layers
  }

  return (
    <div className='flex flex-row w-full h-60 justify-between p-1 bg-secondary'>
      <div className='flex flex-row gap-3 ml-100'>
        <button className='btn' onClick={() => showProcessor(true)}><FiEdit size={24}/></button>
        <button className='btn' onClick={() => showAdvancedSettings(true)}><LuDrum size={24}/></button>
        <p className="text-xl ml-2 mr-2 text-audiowide text-default-black mt-1">REPL</p>
        <button disabled={isPlaying} className='btn' onClick={() => togglePlayState(true)}><FaPlay size={20}/></button>
        <button disabled={!isPlaying} className='btn' onClick={() => togglePlayState(false)}><FaCircleStop size={20}/></button>
      </div>
      <div className='flex flex-row gap-3'>
      </div>

      <div className='flex flex-row gap-3 mr-100'>
        <button className='btn' onClick={() => console.log("test")}><FaCircleStop size={20}/></button>
        <button className='btn' onClick={() => console.log("test")}><FaCircleStop size={20}/></button>
        <p className="text-xl ml-2 mr-2 text-audiowide text-default-black mt-1">MIDI PAD</p>
        <button disabled={isLooping} className='btn' onClick={() => setIsLooping(true)}><FaPlay size={20}/></button>
        <button disabled={!isLooping} className='btn' onClick={() => setIsLooping(false)}><FaCircleStop size={20}/></button>
        <button className='btn' onClick={() => stopLoopAndClear()}><BiReset size={24}/></button>
      </div>
    </div>
  )
}

export default GlobalOptions;