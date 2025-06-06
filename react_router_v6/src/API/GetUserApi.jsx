export async function fetchUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users'); // Sample API
  const data = await res.json();
  return data;
}
