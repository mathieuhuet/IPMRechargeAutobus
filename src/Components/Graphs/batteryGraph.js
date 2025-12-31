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



function BatteryGraph({ batteryLevel, timelabels }) {

  const [ graphDatasets, setGraphDatasets ] = useState([]);

  useEffect(() => {
    let result = [];
    result.push({
      label: 'Niveau de la batterie',
      data: batteryLevel.slice(2),
      borderColor: '#5ea453',
      backgroundColor: '#5ea453',
      cubicInterpolationMode: 'monotone',
      tension: 0.4,
      order: 1
    })
    setGraphDatasets(result)
  }, [batteryLevel]);

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