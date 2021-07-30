async function getTradingSignals(crypto){
	const key2 = CRYPTO_COMPARE_KEY;
  const c = crypto;
	const url = `https://min-api.cryptocompare.com/data/tradingsignals/intotheblock/latest?fsym=${c}&api_key=${key2}`;
	
try {
  const res = await axios.get(url)

	let $trading = $( `
      <div class="tile is-parent">
        <article class="tile is-child box">
            <p class="title" id="price">${res.data.Data.inOutVar.sentiment}</p>
            <p class="subtitle">Analyst Sentiment</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
            <p class="title" id="price">${res.data.Data.inOutVar.score_threshold_bearish}%</p>
            <p class="subtitle">Percentage Bearish</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
            <p class="title" id="price">${res.data.Data.inOutVar.score_threshold_bullish}%</p>
            <p class="subtitle">Percentage Bullish</p>
        </article>
      </div>
    `)
 
 $("#signal").append($trading);

} catch(error){
  if (error) {
    alert("API Limit Reached");
  }
  console.log(error)
}

}

