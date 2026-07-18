import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import * as Location from 'expo-location';

export default function ExploreScreen() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    useEffect(() => {
        (async () => {
            // Request foreground location permission
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setHasPermission(false);
                return;
            }
            setHasPermission(true);
        })();
    }, []);

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
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    warningBox: {
        backgroundColor: 'red',
        padding: 10,
        alignItems: 'center',
    },
    warningText: {
        color: 'white',
        fontWeight: 'bold',
    }
});