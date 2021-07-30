async function getStockData(stock, color, website){
const key = STOCK_KEY;
const stocks = stock;
const colors = color;
const site = website;
const url = `https://cloud.iexapis.com/stable/stock/${stocks}/quote?token=${key}`;
 
try {
  const response = await axios.get(url);
  const pr = response.data.iexRealtimePrice.toFixed(1);
  let volume = (response.data.volume).toLocaleString();
  let ytd = (response.data.ytdChange).toLocaleString();

  let $stock = $(`
      <section class="hero ${colors} welcome is-small">
          <div class="hero-body">
          <center>
            <div class="container">
              <h1 class="title">${response.data.companyName} Dashboard</h1>
              <h2 class="subtitle">${response.data.symbol}</h2>
              <h3 class="subtitle">${response.data.primaryExchange}</h3>
              <h4 class="subtitle">${response.data.latestTime}</h4>
              <a href=${site}><i class="fa fa-link" aria-hidden="true"></i>&nbsp; Website</a>
            </div>
          </center>
          </div>
        </section>

        <section class="info-tiles">
          <div class="tile is-ancestor has-text-centered">
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title" id="price">$${pr}</p>
                <p class="subtitle">Price</p>
              </article>
            </div>
          <div class="tile is-parent">
              <article class="tile is-child box">
                 <p class="title" id="changes">${response.data.change}%</p>
                 <p class="subtitle">Change</p>
              </article>
          </div>
          <div class="tile is-parent">
              <article class="tile is-child box">
                 <p class="title" id="open">$${response.data.open}</p>
                 <p class="subtitle">Open</p>
              </article>
          </div>
          <div class="tile is-parent">
              <article class="tile is-child box">
                 <p class="title" id="close">$${response.data.close}</p>
                 <p class="subtitle">Close</p>
              </article>
          </div>
          <div class="tile is-parent">
              <article class="tile is-child box">
                 <p class="title">$${response.data.week52High}</p>
                 <p class="subtitle">52-week high</p>
              </article>
          </div>
          <div class="tile is-parent">
              <article class="tile is-child box">
                 <p class="title">$${response.data.week52Low}</p>
                 <p class="subtitle">52-week low</p>
              </article>
          </div>
        </div>
         <div class="tile is-ancestor has-text-centered">
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title" id="v">${volume}</p>
                <p class="subtitle">Volume</p>
              </article>
            </div>
          <div class="tile is-parent">
              <article class="tile is-child box">
                 <p class="title" id="ytd">${ytd}%</p>
                 <p class="subtitle">Year-to-Date Change</p>
              </article>
          </div>
          </div>
      </section>


      <section class="section">
         <div class="box" id="chart"</div>
      </section>


      <section class="section">
         <div class="responsive">
          <div class="box">
          <table class="table is-responsive is-hoverable is-fullwidth">
          <thead>
          <tr>
            <th>Price</th>
            <th>Shares Sold</th>
            <th>Venue</th>
            <th>Date</th>
          </tr>
          </thead>
          <tbody id="table">
            <div class="box has-text-centered">
              <p class="title is-3">Largest Trades Today</p>
            </div>
           
          </tbody>
   </table>
  </div>
</div>
</section>



    <section class="section" id="news-section">
        <div id="news">
            <div class="box has-text-centered">
              <p class="title is-3">News</p>
            </div>
        </div>
    </section>

       
      `)

    $(".data").append($stock);

  const priceChanges = document.getElementById("price");
  if (response.data.iexRealtimePrice < response.data.previousClose) {
      priceChanges.style.color = "#ff0000";

      $redArrow = $(`<i class="fas fa-arrow-down" style="color:#ff0000; font-size:20px">`);
      $("#price").prepend($redArrow);

  } else {
      priceChanges.style.color = "#00bf43";

      $greenArrow = $(`<i class="fas fa-arrow-up" style="color:#00bf43; font-size:20px">`);
      $("#price").prepend($greenArrow);
  }


  if (response.data.iexRealtimePrice === null) {
      priceChanges.innerHTML = "Market Closed";
  }

  const changes = document.getElementById("changes");

  if (response.data.change < 0) {
    changes.style.color = "#ff0000";

  } else {
    changes.style.color = "#00bf43";

    $greenPlus = $(`<i class="fas fa-plus" style="color:#00bf43; font-size:20px">`);
    $("#changes").prepend($greenPlus);
  }

  const open = document.getElementById("open");
  const close = document.getElementById("close");

  if (response.data.open === null) {
    open.innerHTML = "Waiting on Update";
    open.style.color = "#ff0000";
  }

  if (response.data.close === null) {
    close.innerHTML = "Waiting on Update";
    close.style.color = "#ff0000";
  }

  const change_ytd = document.getElementById("ytd");
  if (Math.sign(ytd) == 1) {
    change_ytd.style.color = "#00bf43";
    $greenPlus = $(`<i class="fas fa-plus" style="color:#00bf43; font-size:20px">`);
    $("#ytd").prepend($greenPlus);
  } else {
    change_ytd.style.color = "#ff0000";
  }

  const vol = document.getElementById("v");
  if (volume > response.data.previousVolume) {
    v.style.color = "#00bf43";
    $greenPlus = $(`<i class="fas fa-plus" style="color:#00bf43; font-size:20px">`);
    $("#v").prepend($greenPlus);
  } else {
    v.style.color = "#ff0000";
    $redArrow = $(`<i class="fas fa-arrow-down" style="color:#ff0000; font-size:20px">`);
    $("#v").prepend($redArrow);
  }

  if (response.data.iexRealtimePrice == 0) {
    priceChanges.innerHTML = "Market not Open"
    priceChanges.style.color = "#ff0000";
  }

  if (volume == 0) {
    v.innerHTML = "Market not Open";
    v.style.color = "#ff0000";
  }

} catch(err){
  console.log(err);
 }
}




$(".amc").click(async function(){ 
    $(".data").empty();
    await getStockData("amc","is-danger", "https://www.tesla.com/");
    await getChart("amc", "#ff0000");
    await getBook("amc");
    await getNews("AMC Entertainment Holdings Inc");
});

$(".bb").click(async function(){ 
    $(".data").empty();
    await getStockData("bb","is-black", "https://www.blackberry.com/us/en");
    await getChart("bb", "#6a00ff");
    await getBook("bb");
    await getNews("bb");
});

$(".clf").click(async function(){ 
    $(".data").empty();
    await getStockData("clf","is-success", "https://www.clevelandcliffs.com/");
    await getChart("clf", "#02d622");
    await getBook("clf");
    await getNews("clf");
});

$(".clov").click(async function(){ 
    $(".data").empty();
    await getStockData("clov","is-success", "https://www.cloverhealth.com/en/");
    await getChart("clov", "#02d622");
    await getBook("clov");
    await getNews("clov");
});

$(".gme").click(async function(){ 
    $(".data").empty();
    await getStockData("gme","is-danger", "https://news.gamestop.com/");
    await getChart("gme", "#ff0000");
    await getBook("gme");
    await getNews("gme");
});

$(".sndl").click(async function(){ 
    $(".data").empty();
    await getStockData("sndl","is-success", "https://www.sundialcannabis.com/");
    await getChart("sndl", "#02d622");
    await getBook("sndl");
    await getNews("sndl");
});

$(".tlry").click(async function(){ 
    $(".data").empty();
    await getStockData("tlry","is-success", "https://www.tilray.com/");
    await getChart("tlry", "#02d622");
    await getBook("tlry");
    await getNews("tlry");

});

$(".tsla").click(async function(){ 
    $(".data").empty();
    await getStockData("tsla","is-black", "https://www.tesla.com/");
    await getChart("tsla", "#6a00ff");
    await getBook("tsla");
    await getNews("tsla");
});




