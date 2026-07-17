import axios from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const getBaseURL = () => {
    return 'http://10.0.0.232:5005/api';
};

const apiClient = axios.create({
    baseURL: getBaseURL(),
    headers: {
        'Content-Type': 'application/json',
    }
});

apiClient.interceptors.request.use(
    async (config) => {
        let token;

        if (Platform.OS === 'web') {
            token = localStorage.getItem('authToken');
        } else {
            token = await SecureStore.getItemAsync('authToken');
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;