import React from 'react'

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

// Pre-processor allowing you to add custom strudel code to trigger changes
function Preprocessor({globalEditor}) {
  return (
    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
        <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
        <textarea className="form-control" rows="15" id="proc" ></textarea>
    </div>
  )
}

export default Preprocessor