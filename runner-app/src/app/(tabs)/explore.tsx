import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_DEFAULT, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

export default function ExploreScreen() {
    // Permission state
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    // Tracking states
    const [isTracking, setIsTracking] = useState(false);
    const [routeCoordinates, setRouteCoordinates] = useState<{latitude: number, longitude: number}[]>([]);
    const [distance, setDistance] = useState(0);

    // Request permissions on load
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setHasPermission(false);
                return;
            }
            setHasPermission(true);
        })();
    }, []);

    // Toggle button logic
    const toggleTracking = () => {
        if (isTracking) {
            // TODO: Kill the GPS watcher and trigger save logic
            setIsTracking(false);
        } else {
            // TODO: Start the GPS watcher
            // Reset route and distance for a fresh run
            setRouteCoordinates([]);
            setDistance(0);
            setIsTracking(true);
        }
    };

    return (
        <View style={styles.container}>
            {hasPermission === false && (
                <View style={styles.warningBox}>
                    <Text style={styles.warningText}>Location permission denied. Map cannot track you.</Text>
                </View>
            )}

            <MapView
                style={styles.map}
                provider={PROVIDER_DEFAULT}
                initialRegion={{
                    latitude: 43.4516,
                    longitude: -80.4925,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}
            >
                {/* Draws the active route line on the map */}
                {routeCoordinates.length > 0 && (
                    <Polyline
                        coordinates={routeCoordinates}
                        strokeColor="#007AFF" // iOS standard blue
                        strokeWidth={5}
                    />
                )}
            </MapView>

            {/* -- HUD Overlay -- */}
            <View style={styles.hudContainer}>
                {/* Distance Counter */}
                <View style={styles.statsBox}>
                    <Text style={styles.statsText}>{distance.toFixed(2)} km</Text>
                </View>

                {/* Start / Stop Button */}
                <TouchableOpacity
                    style={[styles.trackButton, isTracking ? styles.stopButton : styles.startButton]}
                    onPress={toggleTracking}
                >
                    <Text style={styles.buttonText}>
                        {isTracking ? 'Stop Run' : 'Start Run'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { width: '100%', height: '100%' },
    warningBox: { backgroundColor: 'red', padding: 10, alignItems: 'center', paddingTop: 50 },
    warningText: { color: 'white', fontWeight: 'bold' },

    // Overlay Styles
    hudContainer: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
        alignItems: 'center',
    },
    statsBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    statsText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    trackButton: {
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    startButton: { backgroundColor: '#34C759' }, // iOS Green
    stopButton: { backgroundColor: '#FF3B30' },  // iOS Red
    buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});