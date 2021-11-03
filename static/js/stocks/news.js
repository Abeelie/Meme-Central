async function getNews(stock){ 
  const key = NEWS_KEY;
  const search = stock;
  const url = `https://gnews.io/api/v4/search?q=${search}&token=${key}`;

try {
  const response = await axios.get(url);

  response.data.articles.map(article => {
  let $news = $(`
  <div class="card is-horizontal" style="margin-top:10px">
    <div class="card-image">
      <figure class="image is-square">
        <img src=${article.image} 
          onerror="this.onerror=null;this.src='https://vcunited.club/wp-content/uploads/2020/01/No-image-available-2.jpg';" 
          alt="image">
      </figure>
    </div>

    <div class="card-des">
      <div class="card-content">
        <div class="media-content">
          <p class="title is-4">${article.title}</p>
          <p class="subtitle is-6">${article.source.name}</p>
          <a href=${article.url}>Click here for more info</a>
            <br>
            <p>${article.publishedAt.slice(0, 10)}</p>
        </div>
      </div>
    </div>
</div>
  `);

  $("#news").append($news);
});


} catch(error){
  
  if (error.response.status == 403) {
    alert("News API Limit Reached")
  }
	// console.log(error.response.status)
}

}