import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// Antes del request se ejecuta esta función para que se incluya el token en cada request
// Esto es útil para que no tengamos que incluir el token en cada request que hagamos
// Por ejemplo en ProjectAPI.ts en cada método api.get, api.post, etc.
api.interceptors.request.use( config => {
  // Obtenemos el token del localStorage
  const token = localStorage.getItem('AUTH_TOKEN')
  // Si el token existe, lo incluimos en el header de la request
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
export default api