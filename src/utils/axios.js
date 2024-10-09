import axios from 'axios';

const instance = axios.create({
    baseURL:  process.env.NEXT_PUBLIC_BASE_URL,
    timeout: 10000,
});
console.log('Base URL:',  process.env.NEXT_PUBLIC_BASE_URL);


// Interceptor para agregar el token a cada solicitud
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
