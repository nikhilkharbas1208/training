export const GetUserDetails = async ({params}) => {
    const id =params.userID;
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};