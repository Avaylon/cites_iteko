export function auth(name) {
  return {
    type: 'SET_USER',
    payload: name,
  }
}
