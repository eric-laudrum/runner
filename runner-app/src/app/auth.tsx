import React from 'react';
import { View } from 'react-native';
import AuthModal from '@/components/auth-modal';

export default function AuthScreen() {
    return (
        <View style={{ flex: 1 }}>
            <AuthModal />
        </View>
    );
}