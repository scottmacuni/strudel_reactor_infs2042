
export const LOCAL_STORAGE_SOUNDS_KEY = "savedSounds"

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

    // Handle drum selection
    const drumChoice = settings["drum"]
    proc_text = handleDrumChoice(proc_text, drumChoice)

    // Handle instrument playback speed
    const instrumentSpeedSettings = settings["speed"]
    Object.entries(instrumentSpeedSettings).forEach(([id, speed]) => {
      proc_text = handleSpeedSettings(proc_text, id, speed)
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

// Replaces drum selection prefix with provided value
function handleDrumChoice(text, drum) {
    let proc_text_replaced = text
    proc_text_replaced = proc_text_replaced.replaceAll(`<drum>`, `"${drum}"`);
    return proc_text_replaced
}

// Replaces speed value prefix with provided value
function handleSpeedSettings(text, instrumentId, speed) {
    let proc_text_replaced = text
    proc_text_replaced = proc_text_replaced.replaceAll(`<${instrumentId}_speed>`, speed);
    return proc_text_replaced
}