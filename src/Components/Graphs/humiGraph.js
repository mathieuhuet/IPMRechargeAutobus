import './graph.css';
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
Graphs to compare data Humidity
*/

// id & name are arrays[]

function HumiGraph({ acstate, insideHumi, insideHumi2, outsideHumi, timelabels }) {

  const [ graphDatasets, setGraphDatasets ] = useState([]);

  useEffect(() => {
    let acResult = [];
    // let biggestNumber = 0;
    // for (let k = 0; k < insideHumi.slice(2).length; k++) {
    //   if (insideHumi.slice(2)[k] > biggestNumber) { biggestNumber = insideHumi.slice(2)[k] } 
    //   if (outsideHumi.slice(2)[k] > biggestNumber) { biggestNumber = outsideHumi.slice(2)[k] }
    // }
    for (let j = 0; j < acstate.length; j++) {
      acstate[j] ? acResult.push(insideHumi[j]) : acResult.push(NaN);
    }

    let result = [];
    result.push({
      label: 'Intérieur',
      data: insideHumi.slice(2),
      borderColor: '#4455ff',
      backgroundColor: '#4455ff',
      cubicInterpolationMode: 'monotone',
      tension: 0.4,
      order: 1
    })
    result.push({
      label: 'Extérieur',
      data: outsideHumi.slice(2),
      borderColor: '#307fff',
      backgroundColor: '#307fff',
      cubicInterpolationMode: 'monotone',
      tension: 0.4,
      order: 3
    })
    result.push({
      label: 'A/C',
      data: acResult.slice(2),
      borderColor: '#51b2fd00',
      backgroundColor: '#51b2fd77',
      fill: true,
      pointRadius: 0,
      pointHoverRadius: 0,
      borderWidth: 0,
      pointHitRadius: 0,
      order: 2
    })
    setGraphDatasets(result)
  }, [insideHumi, outsideHumi]);

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
      labels: timelabels.slice(2),
      datasets: graphDatasets,
    }

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
          },
          y: {
            display: true,
            suggestedMin: 0,
            suggestedMax: 100
          }
        }
      },
    };
  
    return (
      <div className="Charts">
        Humidité (%)
        <Line 
          config={config} 
          data={data}
          />
      </div>
    );
  }
}

export default HumiGraph;