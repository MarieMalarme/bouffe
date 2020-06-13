export const fetchData = async (path, setState) => {
  const response = await fetch(`http://localhost:9000/${path}`)
  const data = await response.json()
  if (!data) return
  setState(data)
}
