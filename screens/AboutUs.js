
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import {
    Accuracy,
    requestForegroundPermissionsAsync,
    watchPositionAsync
} from 'expo-location';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { GOOGLE_API_KEY } from '../Secret';
import { FlatList, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';


export default function AboutUs({ navigation }) {

    const initRegion = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    const [location, setLocation] = useState(null);
    const [permissionsGranted, setPermissionsGranted] = useState(false);
    const [mapRegion, setMapRegion] = useState(initRegion);

    const [places, setPlaces] = useState([]);

    const searchLocations = async () => {

        let placesURI = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
        //let placesURI = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=cruise&location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&key=YOUR_API_KEY"
        placesURI += 'location=' + location.coords.latitude;
        placesURI += '%2C' + location.coords.longitude;
        placesURI += '&type=furniture_store';
        //placesURI += '&keyword=Indian';
        placesURI += '&radius=3000'; // 5km
        placesURI += '&key=' + GOOGLE_API_KEY;
        console.log(placesURI)

        let response = await fetch(placesURI);
        let results = await response.json();


        let newPlaces = [];
        for (let r of results.results) {
            let newPlace = {};
            newPlace.latitude = r.geometry.location.lat;
            newPlace.longitude = r.geometry.location.lng;
            newPlace.name = r.name;
            newPlace.id = r.place_id;
            newPlaces.push(newPlace);
        }
        console.log(newPlaces);
        setPlaces(newPlaces);
    }


    let unsubscribeFromLocation = null;

    const subscribeToLocation = async () => {

        let { status } = await requestForegroundPermissionsAsync();
        setPermissionsGranted(status === 'granted');

        if (unsubscribeFromLocation) {
            unsubscribeFromLocation();
        }
        unsubscribeFromLocation = watchPositionAsync({
            accuracy: Accuracy.Highest,
            distanceInterval: 1,
            timeInterval: 1000
        }, location => {
            //console.log('received update:', location);
            setLocation(location);

            setMapRegion({
                ...mapRegion,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })
        });
    }

    useEffect(() => {
        subscribeToLocation();
    }, []);

    return (
        <View style={styles.container}>
            {/* <Text style={styles.paragraph}>
                {permissionsGranted ?
                    location ?
                        `lat: ${location.coords.latitude} \n` +
                        `lon: ${location.coords.longitude}`
                        :
                        "Waiting..."
                    :
                    "Location permission not granted."
                }
            </Text> */}
            <View style={styles.intro}>
            <Text style={styles.paragraph}>
                We are recognized as a market leader in the quality, design, and engineering of contract furniture products, focusing on a wide range of markets and designs.

            </Text>
            {/* <Image style={{objectFit: "scale-down", width: 400, height: 200 }} source={{uri: "https://img.freepik.com/premium-vector/creative-furniture-icon-logo-design-premium-vector_526458-268.jpg?w=2000"}}/> */}


            </View>
            

            <Button
                title="Locate Us"
                onPress={searchLocations}
            />
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={mapRegion}
                showsUserLocation={true}
            >
                {places.map(place => {
                    return (
                        <Marker
                            key={place.id}
                            coordinate={{ latitude: place.latitude, longitude: place.longitude }}
                            title={place.name}
                        />
                    )
                })}
            </MapView>

          


            <View
                style={styles.list}>

                <FlatList
                    data={places}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.locations} onPress={() => {
                                navigation.navigate('Navigation', item);
                            }}>
                                <Text style={{color: "#00274C"}}>{item.name}</Text>
                            </TouchableOpacity>


                        );
                    }}
                />

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    paragraph: {
        fontSize: 16,
        margin: 10
    },

    map: {
        flex: 0.3,
        width: '100%',
        height: '100%'
    },
    list: {
        flex: 0.5,
        margin: 10

    },
    intro:{
        display: 'flex',
        flexDirection: "row",
        flex: 0.2,
        margin: 10
    },
    locations:{
        borderWidth: 2,
        borderRadius: 3,
        backgroundColor: "#FFCB05",
        margin: 3,
        padding: 3
        
    }
})