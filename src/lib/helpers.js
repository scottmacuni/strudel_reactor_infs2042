
export function Proc(pre_proc_text, settings) {
  let proc_text = pre_proc_text
  if(settings){

    // Handle mute states
    const instrumentStates = settings["states"]
    Object.entries(instrumentStates).forEach(([id, state]) => {
      proc_text = handleMuteState(proc_text, id, state)
    })

    // Handle LPF settings
    const lpfSettings = settings["lpf"]
    Object.entries(lpfSettings).forEach(([id, lpf]) => {
      proc_text = handleLPFSettings(proc_text, id, lpf)
    })
    
  }

  // Return processed text for REPL
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

// Replaces LPF value prefix with provided value
function handleLPFSettings(text, instrumentId, lpf) {
    let proc_text_replaced = text
    proc_text_replaced = proc_text_replaced.replaceAll(`<${instrumentId}_lpf>`, lpf);
    return proc_text_replaced
}