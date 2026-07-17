import React, { createContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import apiClient from '@/api/apiClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize the token check on component mount
    useEffect(() => {
        checkLocalToken();
    }, []);

    // Retrieve the token from the appropriate platform storage
    const getToken = async () => {
        if (Platform.OS === 'web') {
            return localStorage.getItem('authToken');
        }
        return await SecureStore.getItemAsync('authToken');
    };

    // Save the token to the appropriate platform storage
    const setToken = async (token) => {
        if (Platform.OS === 'web') {
            localStorage.setItem('authToken', token);
        } else {
            await SecureStore.setItemAsync('authToken', token);
        }
    };

    // Remove the token from the appropriate platform storage
    const removeToken = async () => {
        if (Platform.OS === 'web') {
            localStorage.removeItem('authToken');
        } else {
            await SecureStore.deleteItemAsync('authToken');
        }
    };

    // Validate the existence of a token in local storage
    const checkLocalToken = async () => {
        try {
            const token = await getToken();
            if (token) {
                setUser({ token });
            }
        } catch (error) {
            console.error('Error reading token from secure storage', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Authenticate user and store the returned token
    const login = async (email, password) => {
        const response = await apiClient.post('/auth/login', { email, password });
        const { token, user: userData } = response.data;

        await setToken(token);
        setUser(userData);
    };

    // Register a new user and automatically log them in
    const register = async (email, password, confirmPassword) => {
        await apiClient.post('/auth/register', { email, password, confirmPassword });
        await login(email, password);
    };

    // Clear session state and remove the stored token
    const logout = async () => {
        await removeToken();
        setUser(null);
    };

    // Provide the authentication state and methods to the application tree
    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};