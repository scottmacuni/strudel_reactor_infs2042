import React from 'react';
import { IoCloseSharp } from "react-icons/io5";

/* export function SetupButtons() {

  document.getElementById('play').addEventListener('click', () => globalEditor.evaluate());
  document.getElementById('stop').addEventListener('click', () => globalEditor.stop());
  document.getElementById('process').addEventListener('click', () => {
    Proc()
  }
  )
  document.getElementById('process_play').addEventListener('click', () => {
    if (globalEditor != null) {
      Proc()
      globalEditor.evaluate()
    }
  }
  )
}

export function ProcAndPlay() {
  if (globalEditor != null && globalEditor.repl.state.started == true) {
    console.log(globalEditor)
    Proc()
    globalEditor.evaluate();
  }
}


export function Proc() {

  let proc_text = document.getElementById('proc').value
  let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
  ProcessText(proc_text);
  globalEditor.setCode(proc_text_replaced)
} */

/* export function ProcessText(match, ...args) {

  let replace = ""
  if (document.getElementById('flexRadioDefault2').checked) {
    replace = "_"
  }

  return replace
} */
/*     <div className="col-md-8">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
        <textarea className="form-control" rows="15" id="proc" ></textarea>
    </div>gvg */

// Pre-processor allowing you to add custom strudel code to trigger changes
// Hidden by default but acts as a pop-up if the user wants to see the pre-processed code and edit manually
// User react-dom createPortal to explicitly render above the HTML body as this is pop-up behaviour
function Preprocessor({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="preprocessor-dialog">
      <div className="preprocessor-content">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4 className="m-0">Strudel Pre-Processor</h4>
          <button className="btn btn-sm btn-outline-secondary" onClick={onClose}>
            <IoCloseSharp size={14} />
          </button>
        </div>
        <div>
          <p className='text-lg'>View and edit the raw pre-processor code manually</p>
        </div>
      </div>
    </div>
  );
}
export default Preprocessor