import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { colors, spacing } from '@/styles/theme';

export default function AuthModal() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const { login, register } = useContext(AuthContext);
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            setError('');
            if (isLogin) {
                await login(email, password);
            } else {
                if (password !== confirmPassword) {
                    setError('Passwords do not match');
                    return;
                }
                await register(email, password, confirmPassword);
            }
            // Navigate to explore upon successful login or registration
            router.replace('/explore');
        } catch (err) {
            setError(isLogin ? 'Invalid credentials.' : 'Registration failed.');
        }
    };

    const handleGuestLogin = () => {
        setError('');
        // Bypass authentication and send the user directly to the Explore tab
        router.replace('/explore');
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.modalCard}>
                <Text style={styles.title}>{isLogin ? 'Log In' : 'Create Account'}</Text>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                {!isLogin && (
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />
                )}

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>{isLogin ? 'Submit' : 'Sign Up'}</Text>
                </TouchableOpacity>

                {/* -- Create Account Toggle -- */}
                <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                    <Text style={styles.toggleText}>
                        {isLogin ? "Don't have an account? Create one" : "Already have an account? Log in"}
                    </Text>
                </TouchableOpacity>

                {/* -- Guest Button -- */}
                <TouchableOpacity style={styles.button} onPress={handleGuestLogin}>
                    <Text style={styles.buttonText}>Continue as Guest</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: spacing.md,
        backgroundColor: colors.background,
    },
    modalCard: {
        backgroundColor: colors.surface,
        padding: spacing.lg,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: spacing.lg,
        textAlign: 'center',
        color: colors.textMain,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        padding: spacing.md,
        marginBottom: spacing.md,
    },
    button: {
        backgroundColor: colors.primary,
        padding: spacing.md,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: spacing.sm,
    },
    buttonText: {
        color: colors.surface,
        fontWeight: 'bold',
        fontSize: 16,
    },
    toggleText: {
        color: colors.textMuted,
        textAlign: 'center',
        marginTop: spacing.lg,
        marginBottom: spacing.sm,
    },
    errorText: {
        color: colors.danger,
        textAlign: 'center',
        marginBottom: spacing.md,
    }
});