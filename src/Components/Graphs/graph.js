import './graph.css';
import './graphMobile.css';
import Spinner from '../../Spinner';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Colors
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

/*
Graphs to compare data
*/

// id & name are arrays[]

function Graph({ acstate, insideTemp, insideHumi, insideTemp2, insideHumi2, outsideTemp, outsideHumi, timelabels }) {

  const [ graphDatasets, setGraphDatasets ] = useState([]);

  useEffect(() => {
    let result = [];
    result.push({
      label: 'insideTemp',
      data: insideTemp,
      tension: 0.3,
      borderWidth: 3,
    })
    result.push({
      label: 'insideHumi',
      data: insideHumi,
      tension: 0.3,
      borderWidth: 3,
    })
    result.push({
      label: 'outsideTemp',
      data: outsideTemp,
      tension: 0.3,
      borderWidth: 3,
    })
    result.push({
      label: 'outsideHumi',
      data: outsideHumi,
      tension: 0.3,
      borderWidth: 3,
    })
    setGraphDatasets(result)
  }, [insideHumi]);

  return (
    <div>
      {!insideHumi ? <Spinner /> : <RenderChart />}
    </div>
  )


  function RenderChart () {
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend, 
      Filler,
      Colors
    );

    const data = {
      labels: timelabels,
      datasets: graphDatasets,
    }

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Dernier 48h',
            font: {
              size: 20,
              weight: 'bold',
            },
            color: 'black',
          },
          colors: {
            enabled: true,
          },
        },
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Value'
            },
            suggestedMin: -10,
            suggestedMax: 100
          }
        }
      },
    };
  
    return (
      <div className="Charts">
        <Line 
          config={config} 
          data={data}
          />
      </div>
    );
  }
}

export default Graph;