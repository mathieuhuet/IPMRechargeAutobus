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



function BatteryGraph({ batteryLevel, chargingState, timelabels }) {

  const [ graphDatasets, setGraphDatasets ] = useState([]);

  useEffect(() => {

    let chargingResult = [];
    // let biggestNumber = 0;
    // for (let k = 0; k < insideTemp.slice(2).length; k++) {
    //   if (insideTemp.slice(2)[k] > biggestNumber) { biggestNumber = insideTemp.slice(2)[k] } 
    //   if (outsideTemp.slice(2)[k] > biggestNumber) { biggestNumber = outsideTemp.slice(2)[k] }
    // }

    for (let j = 0; j < chargingState.length; j++) {
      chargingState[j] ? chargingResult.push(batteryLevel[j]) : chargingResult.push(NaN);
    }


    let result = [];
    result.push({
      label: 'Niveau de la batterie',
      data: batteryLevel.slice(2),
      borderColor: '#3382ba',
      backgroundColor: '#3382ba',
      cubicInterpolationMode: 'monotone',
      tension: 0.4,
      order: 1
    })
    result.push({
      label: 'Charging',
      data: chargingResult.slice(2),
      borderColor: '#5ea45300',
      backgroundColor: '#5ea45377',
      fill: true,
      pointRadius: 0,
      pointHoverRadius: 0,
      borderWidth: 0,
      pointHitRadius: 0,
      order: 2
    })
    setGraphDatasets(result)
  }, [batteryLevel, chargingState]);

  return (
    <div>
      {!batteryLevel ? <Spinner /> : <RenderChart />}
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
        Niveau de la batterie (%)
        <Line 
          options={config} 
          data={data}
        />
      </div>
    );
  }
}

export default BatteryGraph;