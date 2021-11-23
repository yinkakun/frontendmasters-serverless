const handleSubmit = async (event) => {
  event.preventDefault();
  const data = new FormData(event.target);

  const result = await fetch('/.netlify/functions/add-movie', {
    method: 'POST',
    body: JSON.stringify({
      id: data.get('id'),
      title: data.get('title'),
      poster: data.get('poster'),
      tagline: data.get('tagline'),
    }),
  }).then((res) => {
    document.querySelector('.message').textContent = `Response: ${res.status}`;
  });
};

const form = document.querySelector('#add-movie');
form.addEventListener('submit', handleSubmit);
