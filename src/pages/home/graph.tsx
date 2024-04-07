import React,{useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';
import { CategoryScale } from "chart.js";
import { Line } from 'react-chartjs-2';
interface IGraphProps {
}
Chart.register(CategoryScale);
Chart.defaults.scale.grid.drawOnChartArea=false;
const Graph: React.FunctionComponent<IGraphProps> = (props) => {
    
    const labels = ["j", "f", "mx", "a", "m", "j", "a", "m", "j"];
    const data = {
        labels: labels,
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgb(29, 78, 216)",
            borderColor: "rgb(14, 95, 227)",
            data: [100,500,200,400,50,630,200,400,100],
            fill:false,
            cubicInterpolationMode:'monotone',
            tension:0.4
          },
        ],
      };
      
      const CHARTOPTIONS = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      
        // Modify the axis by adding scales
        scales: {
          // to remove the labels
          x: {
            ticks: {
              display: false,
            },
      
            // to remove the x-axis grid
            grid: {
              drawBorder: false,
              display: false,
            },
            border:{
                display:false
               }
          },
          // to remove the y-axis labels
          y: {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            // to remove the y-axis grid
            grid: {
              drawBorder: false,
              display: false,
            },
            border:{
                display:false
               }
        }}}
  
  return <>
  <div id='o098'>
 <Line data={data} options={CHARTOPTIONS}/>
  </div>
  </>;
};

export default Graph;
