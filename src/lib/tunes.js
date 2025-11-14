export const custom_tune = `setcpm(140/4)

samples('https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/strudel.json')
samples('https://raw.githubusercontent.com/Mittans/tidal-drum-machines/main/machines/tidal-drum-machines.json')

<1_radio>kick: s("bd:2!4").stack(s("sd mt"))._scope().fast(<1_speed>)

<1_radio>base:  
n("0".add(-14))
.scale("g:minor")
.s("supersaw")
.lpf(<1_lpf>)
.fast(<1_speed>)

<2_radio>bank: 
sound("bd sd [- bd] sd")
.bank(<drum>)
.lpf(<2_lpf>)
.fast(<2_speed>)

<3_radio>snare:
sound(\`
[-  -  oh - ] [-  -  -  - ] [-  -  -  - ] [-  -  -  - ],
[hh hh -  - ] [hh -  hh - ] [hh -  hh - ] [hh -  hh - ],
[-  -  -  - ] [cp -  -  - ] [-  -  -  - ] [cp -  -  - ],
[bd -  -  - ] [-  -  -  bd] [-  -  bd - ] [-  -  -  bd]
\`).fast(<3_speed>).bank(<drum>)

<4_radio>piano:
note("48 67 63 [62, 58]")
.sound("piano, gm_electric_guitar_muted")
.fast(<4_speed>)

<4_radio>tones: n("0 [2 4] <3 5> [~ <4 1>]".add("<0 [0,2,4]>"))
.scale("C5:minor")
.sound("gm_xylophone")
.room(.4).delay(.125)
.fast(<4_speed>)
`;


