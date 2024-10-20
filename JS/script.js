 document.addEventListener("DOMContentLoaded", noticias() );

function noticias (){
    fetch('./data/noticias.json'
    )
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.getElementById('news-container');
            newsContainer.innerHTML = ''; // Clear the loading text

            // Loop through the news articles in the JSON data and display them
            data.articles.forEach(article => {
                const newsItem = document.createElement('div');
                newsItem.classList.add('news-item');
                newsItem.innerHTML = `
                    <h3>${article.title}</h3>
                    <p>${article.content}</p>
                `;
                newsContainer.appendChild(newsItem);
            });
        })
        .catch(error => {
            console.error('Error fetching the news:', error);
            document.getElementById('news-container').innerText = 'Failed to load news.';
        });
}

