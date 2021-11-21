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

    container.appendChild(element);
  });
}

initialize();
