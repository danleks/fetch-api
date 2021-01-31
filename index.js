// https://api.punkapi.com/v2/beers
const API_URL = 'https://api.punkapi.com/v2/beers';
const container = document.querySelector('.container');

const render = (data) => {
    if (!data.length) return;
    const fragment = document.createDocumentFragment();
    data.forEach(({ name, tagline, description, image_url: imageURL }) => {
        const div = document.createElement('div');
        div.classList.add('beer');
        div.innerHTML = `
            <div class="beer--content">
                <h1 class="beer--title">${name}</h1>
                <p class="beer--tagline">${tagline}</p>
                <p class="beer--description">${description}</p>
            </div>
            <img class="beer--image" src="${imageURL}"></img>
        `;
        fragment.appendChild(div);
        // using fragment allows to optimize DOM operations, as it creates vitual copies until all div's are created
    });

    container.appendChild(fragment);
    // in the end only 1 DOM operation is made
};

const handleSuccess = (response) => response.json();

const handleError = (error) => {
    console.log(error);
};

// fetch(API_URL)
//     .then(handleSuccess)
//     .then(render)
//     .catch(handleError)

const handleBeers = async () => {
    try {
        let response = await fetch(API_URL);
        let beers = await response.json();
        render(beers);
    } catch(err) {
        // catches errors both in fetch and response.json
        alert(err);
    }
    return beers;
}

handleBeers();