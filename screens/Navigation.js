import { TabRouter } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API_KEY } from '../Secret';
import {
    Accuracy,
    requestForegroundPermissionsAsync,
    watchPositionAsync
} from 'expo-location';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useState, useEffect } from "react";
import * as Location from 'expo-location';

import { Button } from '@rneui/themed';







export default function Navigation(props) {
    const [location, setLocation] = useState(null);
    // const [origin, setOrigin] = useState();
    // const [destination, setDestination] = useState();
    const [errorMsg, setErrorMsg] = useState(null);
    const { navigation, route } = props;
    const item = route.params;
    console.log(props)
    console.log("ITEM", item)

    const initRegion = {
        latitude: 42.27983519999999,
        longitude: -83.74572750000002,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }









    const origin = { latitude: initRegion.latitude, longitude: initRegion.longitude }
    const destination = { latitude: item.latitude, longitude: item.longitude }

    return (
        <View style={styles.container}>
            <Button onPress={async () => {
                navigation.navigate('HomeScreen');
            }}  title="Back" style={{display: "flex", flexDirection: "row", marginBottom: 10
            }}>
               Back
            </Button>
            {/* <Text>Navigation</Text> */}
            <MapView initialRegion={initRegion} style={styles.map}>
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_API_KEY}
                    strokeWidth={3}
                    strokeColor="hotpink"
                />
                <Marker

                    coordinate={{ latitude: initRegion.latitude, longitude: initRegion.longitude }}

                />
                <Marker

                    coordinate={{ latitude: item.latitude, longitude: item.longitude }}

                />
            </MapView>
            <StatusBar style="auto" />
        </View >
    );
}

const styles = StyleSheet.create({
   
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'left',
        justifyContent: 'center',
    },
    map: {
        flex: 0.8,
        width: '100%',
        height: '100%'
    },
});
