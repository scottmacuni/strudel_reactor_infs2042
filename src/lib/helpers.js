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
} */

export const prefixes = [
    "<radio>"
]

export function ProcAndPlay() {
  if (globalEditor != null && globalEditor.repl.state.started == true) {
    console.log(globalEditor)
    Proc()
    globalEditor.evaluate();
  }
}


export function Proc(proc_text) {
  let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
  ProcessText(proc_text);
  globalEditor.setCode(proc_text_replaced)
}

// Replaces instrument prefix with _ or blank on process
function muteInstrument(text, instrumentId, mute) {
    let proc_text_replaced = text
    if(mute){
        proc_text_replaced.replaceAll(`<${instrumentId}_radio>`, "_");
    } else {
        proc_text_replaced.replaceAll(`<${instrumentId}_radio>`, "");
    }
    return proc_text_replaced
}

export function ProcessText(match, ...args) {

  let replace = ""
  if (document.getElementById('flexRadioDefault2').checked) {
    replace = "_"
  }

  return replace
}