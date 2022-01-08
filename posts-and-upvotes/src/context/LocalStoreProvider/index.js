export function setTokenLocalStorage(token) {
  localStorage.setItem("token", `Bearer ${token}`);
}

export function removeTokenLocalStorage() {
  localStorage.removeItem("token");
}

export function getTokenLocalStorage() {
  return localStorage.getItem("token");
}
