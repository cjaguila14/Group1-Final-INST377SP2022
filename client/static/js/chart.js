async function getEarthQuakeData() {
  const URL = '/api/earth_info';

  const response = await fetch(URL);
  const result = await response.json();
  console.log(result);
  return result;
}

async function makeChart() {
  // let xLabel = [];
  const earthquakes = await getEarthQuakeData();

  const xLabel = earthquakes.map((item) => item.earthquake_id);

  const mags = earthquakes.map((item) => item.magnitude);
  const lineChart = document.getElementById('chart').getContext('2d');

  const myChart = new Chart(lineChart, {
    type: 'line',
    data: {
      labels: xLabel,
      datasets: [{
        label: 'Earthquake Magnitudes',
        data: mags,
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function mainEvent() {
  makeChart();
  getEarthQuakeData();
}

document.addEventListener('DOMContentLoaded', async () => mainEvent());