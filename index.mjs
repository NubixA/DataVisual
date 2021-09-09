import { line } from "./modules/line.mjs";
import { scatter } from "./modules/scatter.mjs";
import { bar } from "./modules/bar.mjs";

try {
  var args = process.argv;
  var type = args[3];

  switch(type){

    case "line":
      line(args);
      break;
    
    case "scatter":
      scatter(args);
      break;
  
    case "bar":
      bar(args);
      break;

    default:
      console.log("\nPlease make sure to inclue a chart type!\nExample: node index.mjs <file_Name> <Chart_Name>\n");
      break;
  };
} catch(err) {
  console.log(err);
};
