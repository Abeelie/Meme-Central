async function getCryptoData(token, color, website){
  const key2 = LUNA_CRUSH_KEY;
  const tokey = token
  const colors = color;
  const site = website
  const url = `https://api.lunarcrush.com/v2?data=assets&key=${key2}&symbol=${tokey}`;
  
try {
  const response = await axios.get(url);
  let date = new Date();
  let now = date.toLocaleTimeString("en-US");
  let cPrice = response.data.data[0].price.toFixed(1)
  let tFollwers = (response.data.data[0].tweet_followers).toLocaleString();
  let volume = (response.data.data[0].volume).toLocaleString();
  let market_cap = (response.data.data[0].market_cap).toLocaleString();
  let max_supply = (Number(response.data.data[0].max_supply)).toLocaleString();

  let $tokens = $( `
      <section class="hero ${colors} welcome is-small">
          <div class="hero-body">
          <center>
            <div class="container">
              <h1 class="title">${response.data.data[0].name} Dashboard</h1>
              <h2 class="subtitle">${response.data.data[0].symbol}</h2>
              <h3 class="subtitle">${now}</h3>
              <a href=${site}><i class="fa fa-link" aria-hidden="true"></i>&nbsp; Website</a>
            </div>
          </center>
          </div>
        </section>

        <section class="info-tiles">
          <div class="tile is-ancestor has-text-centered">
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title" id="price"></i>$${cPrice}</p>
                <p class="subtitle">Price</p>
              </article>
            </div>
          <div class="tile is-parent">
              <article class="tile is-child box">
                 <p class="title" id="changes">${response.data.data[0].percent_change_24h}%</p>
                 <p class="subtitle"> 24h Change</p>
              </article>
          </div>
          <div class="tile is-parent">
              <article class="tile is-child box">
                 <p class="title">${response.data.data[0].alt_rank}</p>
                 <p class="subtitle">Alt-coin rank</p>
              </article>
          </div>
          <div class="tile is-parent">
              <article class="tile is-child box">
                 <p class="title">${response.data.data[0].social_score_24h_rank}</p>
                 <p class="subtitle">Social Score</p>
              </article>
          </div>
          <div class="tile is-parent">
              <article class="tile is-child box">
                 <p class="title">${tFollwers}</p>
                 <p class="subtitle">Twitter Followers</p>
              </article>
          </div>
        </div>
          <div class="tile is-ancestor has-text-centered">
          <div class="tile is-parent">
              <article class="tile is-child box">
                 <p class="title">${volume}</p>
                 <p class="subtitle">Volume</p>
              </article>
          </div>
           <div class="tile is-parent">
              <article class="tile is-child box">
                 <p class="title">${market_cap}</p>
                 <p class="subtitle">Market Cap</p>
              </article>
          </div>
           <div class="tile is-parent">
              <article class="tile is-child box">
                 <p class="title" id="max_supply">${max_supply}</p>
                 <p class="subtitle">Max Supply</p>
              </article>
          </div>
          </div>
      </section>


      <section class="section">
         <div class="box" id="chart"</div>
      </section>


      <section class="section">
      <div class="box has-text-centered">
            <p class="title is-3">Trading Signals</p>
      </div>
      </section>
      
      <section class="info-tiles">
          <div class="tile is-ancestor has-text-centered" id="signal"></div>
      </section>


    <section class="section" id="news-section">
        <div id="news">
            <div class="box has-text-centered">
              <p class="title is-3">News</p>
            </div>
        </div>
    </section>

    `)
 
 $(".data").append($tokens);


 const priceChanges = document.getElementById("price");
 
  if (response.data.data[0].price < response.data.data[0].open) {
      priceChanges.style.color = "#ff0000";

      $redArrow = $(`<i class="fas fa-arrow-down" style="color:#ff0000; font-size:20px">`);
      $("#price").prepend($redArrow);

  } else {
      priceChanges.style.color = "#00bf43";

      $greenArrow = $(`<i class="fas fa-arrow-up" style="color:#00bf43; font-size:20px">`);
      $("#price").prepend($greenArrow);
  }

  const changes = document.getElementById("changes");

  if (response.data.data[0].percent_change_24h < 0) {
    changes.style.color = "#ff0000";

  } else {
    changes.style.color = "#00bf43";

    $greenPlus = $(`<i class="fas fa-plus" style="color:#00bf43; font-size:20px">`);
    $("#changes").prepend($greenPlus);
  }

  const m_supply = document.getElementById("max_supply");
  if (max_supply == 0) {
    m_supply.innerHTML = "No Max Supply Set"
  }

} catch (error){
    console.log(error);
 }

}



$(".doge").click(async function(){ 
    $(".data").empty();
    await getCryptoData("doge","is-warning", "https://dogecoin.com/");
    await getcChart("dogecoin", "#f78c00");
    await getTradingSignals("doge");
    await getcNews("dogecoin");
});

$(".ada").click(async function(){ 
    $(".data").empty();
    await getCryptoData("ada","is-link", "https://cardano.org/");
    await getcChart("cardano", "#e80c0f");
    await getTradingSignals("ada");
    await getcNews("Cardano");
});

$(".link").click(async function(){ 
    $(".data").empty();
    await getCryptoData("link","is-black", "https://chain.link/");
    await getcChart("link", "#9b0ce8");
    await getTradingSignals("link");
    await getcNews("ChainLink");
});

$(".btc").click(async function(){ 
    $(".data").empty();
    await getCryptoData("btc","is-link", "https://bitcoin.org/en/");
    await getcChart("bitcoin", "#001dd6");
    await getTradingSignals("btc");
    await getcNews("Bitcoin");
});

$(".eth").click(async function(){ 
    $(".data").empty();
    await getCryptoData("eth","is-success", "https://ethereum.org/en/");
    await getcChart("ethereum", "#00d615");
    await getTradingSignals("eth");
    await getcNews("ethereum");
});

$(".ltc").click(async function(){ 
    $(".data").empty();
    await getCryptoData("LTC","is-warning", "https://litecoin.org/");
    await getcChart("litecoin", "#f78c00");
    await getTradingSignals("LTC");
    await getcNews("litecoin");
});





