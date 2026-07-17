/* -- Route Layout -- */
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';

// Prevent the splash screen from hiding automatically during initial load
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }}>
                {/* Main app with (tabs) */}
                <Stack.Screen name="(tabs)" />
                {/* Auth screen */}
                <Stack.Screen name="auth" options={{ presentation: 'modal' }} />
            </Stack>
        </AuthProvider>
    );
}