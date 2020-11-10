export const redirectTo = (path: String) => {
  localStorage.setItem('last-page', window.location.pathname)
  window.location.href = `${path}`
}
