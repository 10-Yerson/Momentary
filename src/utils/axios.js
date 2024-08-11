import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 1000,
});

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
