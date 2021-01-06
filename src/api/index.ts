export async function fetchAlbum(albumId: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${albumId}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  )
  return await response.json()
}

export async function fetchAlbums() {
  const response = await fetch('https://jsonplaceholder.typicode.com/albums', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return await response.json()
}

export async function fetchUserAlbums(userId: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/albums?userId=${userId}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  )
  return await response.json()
}

export async function fetchPhoto(photoId: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos/${photoId}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  )
  return await response.json()
}

export async function fetchAlbumPhotos(albumId: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  )
  return await response.json()
}

export async function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return await response.json()
}

export async function fetchUser(userId: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  )
  return await response.json()
}
