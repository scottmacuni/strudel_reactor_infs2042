import { useState } from 'react'
import { StrudelMirror } from '@strudel/codemirror';
import { registerSoundfonts } from '@strudel/soundfonts';
import { useEffect, useRef } from "react";
import console_monkey_patch, { getD3Data } from '../lib/console-monkey-patch';

import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';

function StrudelREPL({
    isPlaying,
    procText,
    instrumentStates,
    instrumentLPF,
    instrumentSpeed,
    drum,
    proc
}) {
    const hasRun = useRef(false);
    const [repl, setRepl] = useState(null);

    // Handle play state
    useEffect(() => {
        if(repl && isPlaying) {
            repl.evaluate();
        } else if (repl && !isPlaying) {
            repl.stop();
        } else {
            console.log("ERR: no repl: ", repl)
        }
    }, [isPlaying])
  
  // Instantiate REPL mirror
useEffect(() => {
    if (!hasRun.current) {
      
      console_monkey_patch();
      
      hasRun.current = true;

      const drawTime = [-2, 2]; // time window of drawn haps 
      
      let strudelRepl = new StrudelMirror({
          defaultOutput: webaudioOutput,
          getTime: () => getAudioContext().currentTime,
          transpiler,
          root: document.getElementById('editor'),
          drawTime,
          onDraw: (haps) => {
            let randomIdx = Math.floor(Math.random() * haps.length)
            console.log("%c[hap]", haps[randomIdx].value)
          },
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
        strudelRepl.setCode(proc(procText));
        setRepl(strudelRepl);
    }
  }, []);

  // Handle proc text change, or instrument state change
  useEffect(() => {
    if(repl){
      repl.setCode(proc(procText)); // set REPL code to processed text
      // If playing, reevaluate to apply changes
      if(isPlaying){
        repl.evaluate()
      }
    }
  }, [procText, instrumentStates, instrumentLPF, drum, instrumentSpeed]);

  return (
    <div>
      <div id="editor" />
    </div>
  )
}

export default StrudelREPL