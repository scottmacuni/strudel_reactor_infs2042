import { FaPlay } from "react-icons/fa";
import { FaCircleStop } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { LuDrum } from "react-icons/lu";

// Contains global options for SPA, in a nav bar like design
function GlobalOptions({
    isPlaying,
    togglePlayState,
    showProcessor,
    showAdvancedSettings
}) {

  return (
    <div className='flex flex-row w-full h-60 justify-between p-1 bg-secondary'>
      <div className='flex flex-row gap-3 ml-60'>
        <button className='btn' onClick={() => showProcessor(true)}><FiEdit size={24}/></button>
        <button className='btn' onClick={() => showAdvancedSettings(true)}><LuDrum size={24}/></button>
        <button disabled={isPlaying} className='btn' onClick={() => togglePlayState(true)}><FaPlay size={20}/></button>
        <button disabled={!isPlaying} className='btn' onClick={() => togglePlayState(false)}><FaCircleStop size={20}/></button>
      </div>
      <div className='flex flex-row gap-3'>
          <button>A</button>
          <button>B</button>
          <button>C</button>
          <button>D</button>
      </div>

      <div className='flex flex-row gap-3 mr-60'>
        <button>E</button>
        <button>F</button>
        <button>G</button>       
      </div>
    </div>
  )
}

export default GlobalOptions;