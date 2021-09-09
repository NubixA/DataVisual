import * as d3 from "d3";
import * as jsdom from "jsdom";
import * as fs from "fs";
const {JSDOM} = jsdom;
const document = new JSDOM().window.document;

export function line(args){
    try {
      var data = JSON.parse(fs.readFileSync(`${args[2]}.json`));
    } catch(err) {
      console.log(err);
    }
      
    var ySorted = data.sort((a,b)=>{ return b.y - a.y }).reverse()
    var yMin = ySorted[0].y;
    var yMax = ySorted[ySorted.length-1].y;
    var xSorted = data.sort((a,b)=>{ return b.x - a.x }).reverse()
    var xMin = xSorted[0].x;
    var xMax = xSorted[xSorted.length-1].x;
      
    var margin = {top: 10, right: 40, bottom: 30, left: 30};
    var width = 500 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
    var x = d3.scaleLinear().domain([Math.floor(xMin), Math.ceil(xMax)]).range([10, width]); 
    var y = d3.scaleLinear().domain([Math.floor(yMin), Math.ceil(yMax)]).range([height, 0]); 
      
    var svg = d3.select(document.body)
      .append("svg") 
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
        
    svg.append('g')
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
        
    svg.append('g')
      .call(d3.axisLeft(y));
      
    var line = d3.line()
        .curve(d3.curveStep)
        .x(d => x(d.x))
        .y(d => y(d.y));
      
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", line);
      
    fs.writeFileSync(`${args[2]}-line.svg`, '<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">' + svg.node().outerHTML + '</svg>');
    console.log(`${args[2]}-line.svg has been created!`)
}