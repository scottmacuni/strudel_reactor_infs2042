import React, { useState } from 'react'
import { 
  initStrudel, 
  note, 
  hush, 
  evalScope, 
  getAudioContext, 
  webaudioOutput, 
  registerSynthSounds, 
  initAudioOnFirstClick, 
  transpiler,
} from "@strudel/web";
import { StrudelMirror } from '@strudel/codemirror';
import { registerSoundfonts } from '@strudel/soundfonts';
import { useEffect, useRef } from "react";
import { samples } from '@strudel/webaudio';

function StrudelREPL({
    isPlaying,
    procText,
}) {
    const hasRun = useRef(false);
    const [repl, setRepl] = useState(null);

    // Handle play state
    useEffect(() => {
        if(repl && isPlaying) {
            console.log("start repl: ", repl)
            repl.evaluate();
        } else if (repl && !isPlaying) {
            console.log("stop repl: ", repl)
            repl.stop();
        } else {
            console.log("ERR: no repl: ", repl)
        }
    }, [isPlaying])
  
  // Instantiate REPL mirror
  useEffect(() => {

    if (!hasRun.current) {
      hasRun.current = true;
      (async () => {
        await initStrudel();

        let strudelRepl = new StrudelMirror({
          defaultOutput: webaudioOutput,
          getTime: () => getAudioContext().currentTime,
          transpiler,
          root: document.getElementById('editor'),
          prebake: async () => {
            initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
            const loadModules = evalScope(
              import('@strudel/core'),
              import('@strudel/draw'),
              import('@strudel/mini'),
              import('@strudel/tonal'),
              import('@strudel/webaudio'),
            );
            await Promise.all([
              loadModules, 
              registerSynthSounds(), 
              registerSoundfonts(),
            ]);
          },
        });
        strudelRepl.setCode(procText);
        setRepl(strudelRepl);
        // TODO: re-integrate proc Proc()
      })();
      //document.getElementById('proc').value = stranger_tune
      //SetupButtons()
    }

  }, []);

  // Handle proc text change
  useEffect(() => {
    if(repl){
      repl.setCode(procText);
    }
  }, [procText]);

  return (
    <div>
      <div id="editor" />
    </div>
  )
}

export default StrudelREPL