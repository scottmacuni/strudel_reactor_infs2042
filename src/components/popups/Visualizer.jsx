import { IoCloseSharp } from "react-icons/io5";
import { getD3Data } from '../../lib/console-monkey-patch';
import { useEffect, useState } from "react";
import * as d3 from "d3";

/*       const chartGroup = svg.append('g')
          .classed('chartGroup', true)
          .attr('transform', 'translate(30,3)');

      chartGroup
          .append('linearGradient')
          .attr("id", "line-gradient")
          .attr("gradientUnits", "userSpaceOnUse")
          .attr("x1", 0)
          .attr("y1", yScale(0))
          .attr("x2", 0)
          .attr("y2", yScale(maxVal))
          .selectAll("stop")
          .data([
              { offset: "0%", color: "green" },
              { offset: "100%", color: "red" }
          ])
          .enter().append("stop")
          .attr("offset", function (d) { return d.offset; })
          .attr("stop-color", function (d) { return d.color; });

      chartGroup
          .append('path')
          .datum(graphArr)
          .attr('fill', 'none')
          .attr('stroke', 'url(#line-gradient)')
          .attr('stroke-width', 1.5)
          .attr('d', d3.line()
              .x((d, i) => i * barWidth)
              .y((d) => yScale(d))
          ) */


// Full screen visualizer pop-up that shows sound wave forms
function Visualizer({ 
  isOpen, 
  onClose,
  isPlaying
}) {
    // Visualizer values and states
    const [nextVal, setNextVal] = useState(0);
    const [allValues, setAllValues] = useState([]);
    const [graphArr, setGraphArr] = useState([]);
    const [mode, setMode] = useState("bar");

    // Constants
    const valueTimeOut = 200; // 0.5 sec
    const graphTimeOut = 10000; // 10 sec
    const maxVal = 3000;
    const maxItems = 20;

    // Get graph values from d3 logs
    useEffect(() => {
      console.log("fetch initial..")
      const newValues = getD3Data()
      setAllValues(newValues)
    }, [isOpen])
    
    // Fetch new log values every 15 seconds
    useEffect(() => {
      if(!isOpen) return;
         const interval = setInterval(() => {
          console.log("fetch new..")
          let nextValues = getD3Data();
          if(nextValues && nextValues.length > 0){
            setAllValues(nextValues )
          }
        }, graphTimeOut);

        return () => clearInterval(interval)
    }, [isOpen, isPlaying]);
    
    // Pop a new graph value every 0.5 sec
    useEffect(() => {
      if(!isOpen) return;
       const interval = setInterval(() => {
          console.log("pop next..")
          if(allValues && allValues.length > 0){
            let currentVals = allValues;            
            let nextVal = currentVals.pop();
            console.log("next: ", nextVal)
            if(nextVal){
              setNextVal(nextVal)
            }
            setAllValues(currentVals)
          }
        }, valueTimeOut);
        return () => clearInterval(interval)
    }, [isOpen]);

    // Update graph array every time new value extracted
    useEffect(() => {
      if(!isOpen) return;
      console.log("update graphArr..")
      if(nextVal > 0){
        let tempArr = [...graphArr, nextVal];
        if (tempArr.length > maxItems) { tempArr.shift() }
        console.log("graph arr: ", tempArr)
        setGraphArr(tempArr);
      }
    }, [nextVal]);

    useEffect(() => {
      if(!isOpen || !isPlaying || graphArr.length <= 0) return;

      console.log("draw graph")
      const svg = d3.select('#graph');
      console.log(svg)

      if(!svg) return;
      svg.selectAll("*").remove();

      let w = svg.node().getBoundingClientRect().width - 40
      let h = svg.node().getBoundingClientRect().height - 25

      if(w <= 0 || h <= 0){
        console.log("Invalid SVG dimensions: ", w, h)
        return;
      }

      const barMargin = 10;
      const barWidth = w / graphArr.length
      console.log(w, h, graphArr.length, barWidth)

      let yScale = d3.scaleLinear()
          .domain([0, maxVal])
          .range([h, 0]);

       let barGroups = svg
          .selectAll('g')
          .data(graphArr);

      let newBarGroups = barGroups.enter()
         .append('g')
         .attr('transform', (d, i) => {
             return `translate(${i * barWidth}, ${yScale(d)})`
         });

      newBarGroups
         .append('rect')
         .attr('height', 0)
         .attr('y', d => h - yScale(d))
         .attr('width', barWidth - barMargin)
         .attr('y', 0)
         .attr('height', d => h - yScale(d))
         .attr('fill', (d, i) => `rgb(${(360 / maxVal * d + 1)}, ${360 - (360 / maxVal * d + 1)}, 60)`)

    }, [graphArr, isOpen]);

    function drawBarChart(){
      console.log("draw bar")

      const svg = d3.select('#graph');
      console.log(svg)
      if(!svg) return;

      svg.selectAll("*").remove();

      let w = svg.node().getBoundingClientRect().width - 40
      let h = svg.node().getBoundingClientRect().height - 25

      const barMargin = 10;
      const barWidth = w / graphArr.length

      let yScale = d3.scaleLinear()
          .domain([0, maxVal])
          .range([h, 0]);

       let barGroups = svg
          .selectAll('g')
          .data(graphArr);

      let newBarGroups = barGroups.enter()
         .append('g')
         .attr('transform', (d, i) => {
             return `translate(${i * barWidth}, ${yScale(d)})`
         });

      newBarGroups
         .append('rect')
         .attr('height', 0)
         .attr('y', d => h - yScale(d))
         .attr('width', barWidth - barMargin)
         .attr('y', 0)
         .attr('height', d => h - yScale(d))
         .attr('fill', (d, i) => `rgb(${(360 / maxVal * d + 1)}, ${360 - (360 / maxVal * d + 1)}, 60)`)
    }

  // Only render on open state
  if (!isOpen) return null;

  return (
    <div className="popup-visualizer">
      <div className="popup-content-visualizer">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <h4 className="text-xl text-roboto text-default-white ml-60"><b>Visualizer</b></h4>
          <p className="text-lg text-roboto text-default-white mr-60">Play the REPL to view audio output</p>
          <div className=" mr-60">
             <button className="btn btn-outline-danger ml-2" onClick={onClose}>
              <IoCloseSharp size={14} />
            </button>           
          </div>
        </div>
        <div className="container p-3">
            <svg id="graph" width="100%" height="550px" className="border border-primary rounded p-2"></svg>
        </div>
      </div>
    </div>
  );
}
export default Visualizer