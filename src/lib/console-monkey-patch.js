let originalLog = null;
const logArray = [];


export default function console_monkey_patch() {
    //If react multicalls this, do nothing
    if (originalLog) return;

    originalLog = console.log;

    //Overwrite console.log function
    console.log = function (...args) {

        // Only work on logs prefixed with %c[hap]
        if (args[0] === "%c[hap]")
        {
            let value = args[1];    // the value containing sound/note informatin

            // custom logic to create a value to be displayed in the visualiser based on what
            // information was provided.
            let maxValue = 3000;    // maximum for display
            let minValue = 100;     // minimum for dispaly 
            let graphValue = 400;   // default graph value
            let multiplier = 2; // default multiplier

            // If value was a note multiplier is 3
            if(value["note"]) {
                multiplier = 3
            }

            // If sound was a supersaw multiplier is 5
            if(value["s"] && value["s"] === "supersaw"){
                multiplier = 5
            }

            // Get values which may be provided to do random calculations
            let cutoff = value["cutoff"] ? value["cutoff"] : 250
            let gain = value["gain"] ? value["gain"] : 0.5
            let postgain = value["postgain"] ? value["postgain"] : 2
            let speed = value["speed"] ? value["speed"] : 0.2

            // Formula to get graphValue
            graphValue = graphValue + cutoff;
            graphValue = graphValue * (1 + gain);
            graphValue = graphValue * postgain;
            graphValue = Math.floor(graphValue * (multiplier * (speed + 1)))

            if(graphValue > maxValue){
                graphValue = maxValue - (graphValue % maxValue)
            } else if (graphValue < minValue) {
                graphValue = minValue
            }
            
            //If so, add it to the Array of values.
            //Then remove the oldest values once we've hit 60.
            logArray.push(graphValue);

            if (logArray.length > 60) {
                logArray.splice(0, 1);
            }
            //Dispatch a customevent we can listen to in App.js
            const event = new CustomEvent("d3Data", { detail: [...logArray] });
            document.dispatchEvent(event);

        }
    };

}

export function getD3Data() {
    return [...logArray];
}

export function subscribe(eventName, listener) {
    document.addEventListener(eventName, listener);
}

export function unsubscribe(eventName, listener) {
    document.removeEventListener(eventName, listener);
}