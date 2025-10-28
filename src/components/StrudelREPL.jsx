import React, { useState } from 'react'
// import { 
//   initStrudel, 
//   note, 
//   hush, 
//   evalScope, 
//   getAudioContext, 
//   webaudioOutput, 
//   registerSynthSounds, 
//   initAudioOnFirstClick, 
//   transpiler,
// } from "@strudel/web";
import { StrudelMirror } from '@strudel/codemirror';
import { registerSoundfonts } from '@strudel/soundfonts';
import { useEffect, useRef } from "react";
import console_monkey_patch, { getD3Data } from '../lib/console-monkey-patch';

import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';

const handleD3Data = (event) => {
    console.log("d3 data: ", event.detail);
};

function StrudelREPL({
    isPlaying,
    procText,
    instrumentStates,
    instrumentLPF,
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
      
      document.addEventListener("d3Data", handleD3Data);
      console_monkey_patch();
      
      hasRun.current = true;

      //init canvas
      const canvas = document.getElementById('roll');
      canvas.width = canvas.width * 2;
      canvas.height = canvas.height * 2;
      const drawContext = canvas.getContext('2d');
      const drawTime = [-2, 2]; // time window of drawn haps
      
      let strudelRepl = new StrudelMirror({
          defaultOutput: webaudioOutput,
          getTime: () => getAudioContext().currentTime,
          transpiler,
          root: document.getElementById('editor'),
          drawTime,
          onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
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
        // TODO: re-integrate proc Proc()
    }
  }, []);

  // Handle proc text change, or instrument state change
  useEffect(() => {
    if(repl){
      console.log("change proc text received, setting in REPL")
      repl.setCode(proc(procText)); // set REPL code to processed text

      // If playing, reevaluate to apply changes
      if(isPlaying){
        repl.evaluate()
      }
    }
  }, [procText, instrumentStates, instrumentLPF]);

  return (
    <div>
      <div id="editor" />
      <canvas id="roll"></canvas>
    </div>
  )
}

export default StrudelREPL