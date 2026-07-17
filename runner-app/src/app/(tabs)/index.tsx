import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

export default function HomeScreen() {
    const router = useRouter();

    useEffect(() => {
        SplashScreen.hideAsync();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Main Home Page Content</Text>

            <TouchableOpacity
                style={styles.authButton}
                onPress={() => router.push('/auth')}
            >
                <Text style={styles.authButtonText}>Log In or Create Account</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, marginBottom: 20 },
    authButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8 },
    authButtonText: { color: 'white', fontWeight: 'bold' }
});