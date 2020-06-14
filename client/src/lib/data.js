export const fetchData = async (path, setState) => {
  const response = await fetch(`http://localhost:9000/${path}`)
  const data = await response.json()
  if (!data) return
  setState(data)
}

export const sendData = (method, path, data, setState) => {
  return fetch(`http://localhost:9000/${path}`, {
    method: method.toUpperCase(),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => setState(res))
}
