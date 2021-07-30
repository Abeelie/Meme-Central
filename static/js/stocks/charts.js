async function getChart(s, color){
  const col = color;
	const stocky = s;
  const key = STOCK_KEY;
  const url = `https://cloud.iexapis.com/stable/stock/${stocky}/chart/1y?token=${key}`;

try{

	let $chart = $(`<canvas id="line-chart" width="400" height="200"></canvas>`);
  $("#chart").append($chart);

  let date = [];
  let price = [];
  
  $.getJSON(url, function(data) {
    for(let i = 0; i < data.length; i++){
      date.push(new Date(data[i].date).toLocaleDateString("en-US"));
      price.push(Number(data[i].fClose));
    }

let myChart = new Chart(document.getElementById("line-chart"), {
  type: 'line',
  data: {
    labels: date,
    datasets: [{ 
        data: price,
        label: `${stocky}`,
        borderColor: `${col}`,
        fill: false
      }, 
    ]
  }, 
  options: {
      tooltips: {
      mode: 'x',
      intersect: false
      },
      plugins:{
         title: {
            display: true,
            text: `Historical EOD Prices Year-to-Date for ${stocky}`,
             font: {
                size: 20
              }
            }
        },
      scales: {
          yAxes: {
            title: {
              display: true,
                text: "Price",
                  font: {
                      size: 15
                    }
                }  
            },
          xAxes: {
            title: {
              display: true,
                text: "Dates",
                  font: {
                      size: 15
                    }
                }  
            }  
        } 
    }
 });


});   
 
 } catch(error) {
	console.log(error);
 }
}