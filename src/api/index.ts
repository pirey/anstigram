export async function fetchAlbums() {
  const response = await fetch('https://jsonplaceholder.typicode.com/albums', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return await response.json()
}

export async function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return await response.json()
}
