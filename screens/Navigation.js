import { TabRouter } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API_KEY } from '../Secret';
import {
    Accuracy,
    requestForegroundPermissionsAsync,
    watchPositionAsync
} from 'expo-location';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';





export default function Navigation(props) {
    const { navigation, route } = props;
    const  item  = route.params;
    console.log(props)
    console.log("ITEM",item)

    const initRegion = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }


   const origin = {latitude: initRegion.latitude,longitude: initRegion.longitude}
    const destination = {latitude: item.latitude,longitude: item.longitude}

    return (
        <View style={styles.container}>
            <Text>Navigation</Text>
            <MapView initialRegion={initRegion}   style={styles.map}>
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_API_KEY}
                    strokeWidth={3}
                    strokeColor="hotpink"
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        flex: 0.3,
        width: '100%',
        height: '100%'
    },
});
