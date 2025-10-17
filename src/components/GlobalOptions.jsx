import { FaPlay } from "react-icons/fa";
import { FaCircleStop } from "react-icons/fa6";
import { BiReset } from "react-icons/bi";

/* export function Play(repl) {
  if (globalEditor != null && globalEditor.repl.state.started == true) {
    console.log(globalEditor)
    Proc()
    globalEditor.evaluate();
  }
} */

// TODO:
/* export function Proc() {

  let proc_text = document.getElementById('proc').value
  let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
  ProcessText(proc_text);
  globalEditor.setCode(proc_text_replaced)
} */

// TODO:
/* export function ProcessText(match, ...args) {

  let replace = ""
  if (document.getElementById('flexRadioDefault2').checked) {
    replace = "_"
  }

  return replace
} */

// Contains global options for SPA, in a nav bar like design
function GlobalOptions({
    isPlaying,
    togglePlayState,
}) {

  return (
    <div className='flex flex-row w-full h-60 justify-between p-1 bg-secondary'>
      <div className='flex flex-row gap-3'>
         <button>Pre</button>
         <button>P&P</button>
          <button>D</button>
      </div>
      <div className='flex flex-row gap-3'>
        <button disabled={isPlaying} className='btn' onClick={() => togglePlayState(true)}><FaPlay size={20}/></button>
        <button disabled={!isPlaying} className='btn' onClick={() => togglePlayState(false)}><FaCircleStop size={20}/></button>
        <button className='btn' onClick={() => console.log("reset")}><BiReset size={30}/></button>
      </div>

      <div className='flex flex-row gap-3'>
        <button>E</button>
        <button>F</button>
        <button>G</button>       
      </div>
    </div>
  )
}

export default GlobalOptions;