const api = '62b4debbbf7547f480258f3a583616f1';
const main = document.querySelector('main');
const selector = document.querySelector('#sourceSelector');
const defaultSource = 'the-washington-post';

window.addEventListener('load',async e =>{
    updateNews();
    await updateSources();
    selector.value = defaultSource;

    selector.addEventListener('change',e=>{
        updateNews(e.target.value);
    });

    if ('serviceWorker' in navigator) {
        try {
            //handle the traffic  + path 
            navigator.serviceWorker.register('sw.js');
            console.log("sw registred");
        } catch (error) {
            console.log("sw registred failed !");
        }
    }
});
// get the news 
async function updateNews(source = defaultSource) {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${api}`);
    const json = await res.json();

    main.innerHTML = json.articles.map(createArticle).join('\n');
}
// get the sources 
async function updateSources() {
    const res = await fetch(`https://newsapi.org/v2/sources?apiKey=${api}`);
    const json = await res.json();

    selector.innerHTML = json.sources
    .map(src=>`<option value="${src.id}">${src.name}</option>`)
    .join('\n');
}

//create articles
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