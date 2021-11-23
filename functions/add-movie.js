const { query } = require('./lib/hasura');

exports.handler = async (event) => {
  const { id, title, tagline, poster } = JSON.parse(event.body);

  const result = await query({
    query: `mutation AddMovies($poster: String = "", $title: String = "", $tagline: String = "", $id: String = "") {
              insert_movies_one(object: {poster: $poster, title: $title, tagline: $tagline, id: $id}) {
                id
                poster
                tagline
                title
              }
            }`,
    variables: { id, title, tagline, poster },
  });

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};
