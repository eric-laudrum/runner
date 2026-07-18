import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExploreScreenWeb() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Maps are not supported on the web platform.
                View on iOS or Android.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    text: {
        textAlign: 'center',
        fontSize: 16
    }
});