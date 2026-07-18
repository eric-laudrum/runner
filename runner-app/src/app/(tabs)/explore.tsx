import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_DEFAULT, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

// Calculate distance between two coordinates in km
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

export default function ExploreScreen() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [isTracking, setIsTracking] = useState(false);
    const [routeCoordinates, setRouteCoordinates] = useState<{latitude: number, longitude: number}[]>([]);
    const [distance, setDistance] = useState(0);

    const locationSubscription = useRef<Location.LocationSubscription | null>(null);
    const mapRef = useRef<MapView>(null);

    // Initial permission request
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

        // Cleanup watcher on unmount
        return () => {
            if (locationSubscription.current) {
                locationSubscription.current.remove();
            }
        };
    }, []);

    // Handle Start/Stop tracking
    const toggleTracking = async () => {
        if (isTracking) {
            if (locationSubscription.current) {
                locationSubscription.current.remove();
                locationSubscription.current = null;
            }
            setIsTracking(false);
        } else {
            setRouteCoordinates([]);
            setDistance(0);
            setIsTracking(true);

            locationSubscription.current = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 2000,
                    distanceInterval: 2,
                },
                (newLocation) => {
                    const newCoord = {
                        latitude: newLocation.coords.latitude,
                        longitude: newLocation.coords.longitude,
                    };

                    // Force camera update
                    mapRef.current?.animateCamera({
                        center: newCoord,
                        zoom: 17,
                    });

                    // Update route and distance
                    setRouteCoordinates((prev) => {
                        if (prev.length > 0) {
                            const last = prev[prev.length - 1];
                            const added = calculateDistance(
                                last.latitude, last.longitude,
                                newCoord.latitude, newCoord.longitude
                            );
                            setDistance((d) => d + added);
                        }
                        return [...prev, newCoord];
                    });
                }
            );
        }
    };

    // Block render until permission resolves
    if (hasPermission === null) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {!hasPermission && (
                <View style={styles.warningBox}>
                    <Text style={styles.warningText}>Location permission denied.</Text>
                </View>
            )}

            <MapView
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_DEFAULT}
                initialRegion={{
                    latitude: 43.4516,
                    longitude: -80.4925,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={hasPermission}
                showsMyLocationButton={hasPermission}
            >
                {routeCoordinates.length > 0 && (
                    <Polyline
                        coordinates={routeCoordinates}
                        strokeColor="#007AFF"
                        strokeWidth={5}
                    />
                )}
            </MapView>

            <View style={styles.hudContainer}>
                <View style={styles.statsBox}>
                    <Text style={styles.statsText}>{distance.toFixed(2)} km</Text>
                </View>

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
    centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    map: { width: '100%', height: '100%' },
    warningBox: { backgroundColor: 'red', padding: 10, alignItems: 'center', paddingTop: 50, zIndex: 10 },
    warningText: { color: 'white', fontWeight: 'bold' },
    hudContainer: { position: 'absolute', bottom: 40, left: 20, right: 20, alignItems: 'center' },
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
    statsText: { fontSize: 24, fontWeight: 'bold', color: '#333' },
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
    startButton: { backgroundColor: '#34C759' },
    stopButton: { backgroundColor: '#FF3B30' },
    buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});