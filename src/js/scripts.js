const addRatings = (element, ratings) => {
  ratings.forEach((rating) => {
    const item = document.createElement('li');
    const label = document.createElement('span');
    label.classList.add('source');
    label.textContent =
      rating.Source === 'Internet Movie Database' ? 'IMDB' : rating.Source;
    item.appendChild(label);

    const ratingValue = document.createElement('span');
    ratingValue.textContent = rating.Value;
    item.appendChild(ratingValue);

    const ratingsElement = element.querySelector('.scores');
    ratingsElement.appendChild(item);
  });
};

async function initialize() {
  const movies = await fetch('/.netlify/functions/movies').then((res) =>
    res.json()
  );

  const container = document.querySelector('.movies');
  const template = document.querySelector('#movie-template');

  movies.forEach((movie) => {
    const element = template.content.cloneNode(true);

    const img = element.querySelector('img');
    img.src = movie.poster;
    img.alt = movie.title;

    element.querySelector('h2').textContent = movie.title;
    element.querySelector('.tagline').textContent = movie.title;

    addRatings(element, movie.ratings);

    container.appendChild(element);
  });
}

initialize();
