export const GetMoviesDetails = async ({params}) => {
    const id =params.movieID;
  try {
    const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=1c12799f`);
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};