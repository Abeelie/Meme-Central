async function getcChart(token, color){
  const col = color;
  const tok = token;  
  const url = `https://api.coingecko.com/api/v3/coins/${tok}/market_chart?vs_currency=usd&days=360&interval=daily`;

try{
    
  let $chart = $(`<canvas id="line-chart" width="400" height="200"></canvas>`);

    $("#chart").append($chart);

    let date = [];
    let price = [];

    $.getJSON(url, function(data) {
    for(let i = 0; i < data.prices.length; i++){
     date.push(new Date(data.prices[i][0]).toLocaleDateString("en-US"));
     price.push(data.prices[i][1]);
}

 new Chart(document.getElementById("line-chart"), {
  type: 'line',
  data: {
    labels: date,
    datasets: [{ 
        data: price,
        label: `${tok}`,
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
            text: `Historical EOD Prices Year-to-Date for ${tok}`,
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