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

import { lpf } from "@strudel/core"

/* export const prefixes = [
    "<radio>"
] */

/* export function ProcAndPlay() {
  if (globalEditor != null && globalEditor.repl.state.started == true) {
    console.log(globalEditor)
    Proc()
    globalEditor.evaluate();
  }
} */


export function Proc(pre_proc_text, settings) {
  let proc_text = pre_proc_text
  if(settings){
    const instrumentStates = settings["states"]
    Object.entries(instrumentStates).forEach(([id, state]) => {
      proc_text = handleMuteState(proc_text, id, state)
    })

    
    const lpfSettings = settings["lpf"]
    Object.entries(lpfSettings).forEach(([id, lpf]) => {
      proc_text = handleMuteState(proc_text, id, lpf)
    })
    
  }

  return proc_text
}

// Replaces instrument prefix with _ or blank on process
function handleMuteState(text, instrumentId, muteState) {
    let proc_text_replaced = text
    if(muteState){
        proc_text_replaced = proc_text_replaced.replaceAll(`<${instrumentId}_radio>`, "_");
    } else {
        proc_text_replaced = proc_text_replaced.replaceAll(`<${instrumentId}_radio>`, "");
    }
    return proc_text_replaced
}

// Replaces instrument prefix with _ or blank on process
function handleLPFSettings(text, instrumentId, lpf) {
    let proc_text_replaced = text
    proc_text_replaced = proc_text_replaced.replaceAll(`<${instrumentId}_lpf>`, lpf);
    return proc_text_replaced
}

/* export function ProcessText(match, ...args) {

  let replace = ""
  if (document.getElementById('flexRadioDefault2').checked) {
    replace = "_"
  }

  return replace
} */