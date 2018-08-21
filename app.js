const api = '62b4debbbf7547f480258f3a583616f1';
const main = document.querySelector('main');
window.addEventListener('load', e =>{
    updateNews();
});

async function updateNews(){
    const res = await fetch (`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${api}`);
    const json = await res.json();

    main.innerHTML = json.articles.map(createArticle).join('\n');

}

function createArticle(article){

    return `
        <div class="article">
            <a href="${article.url}">
                <h2>${article.title}</h2>
                <div class="caption">
                    <img src = "${article.urlToImage}"> 
                </div>
                <p>${article.description}</p>
            </a>    
        </div>
    `;

}