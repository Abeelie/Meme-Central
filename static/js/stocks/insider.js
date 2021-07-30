async function getBook(stock){
	const key = STOCK_KEY;
  const stocki = stock;
  const url = `https://cloud.iexapis.com/stable/stock/${stocki}/largest-trades?token=${key}`;

try{

    const res = await axios.get(url);

    res.data.forEach(insider => {

    let times = new Date(insider.time).toLocaleTimeString("en-US");
    let shares = insider.size.toLocaleString();

    let $insider = $( `

      <tr>
        <td>$${insider.price}</td>
        <td id="size">${shares}</td>
        <td>${insider.venueName}</td>
        <td>${times}</td>
      </tr>
    `);
 
 $("#table").append($insider);

});

  if (res.data.length == 0) {
    let $msg = (`<tr><td style="color:#ff0000">No Large Trades Today</td></tr>`); 
    $("#table").append($msg);
  }


 } catch(error) {
  console.log(error);
 }
}

