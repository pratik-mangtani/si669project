import { StatusBar } from 'expo-status-bar';
import { useEffect } from "react";
import { LOAD_ITEMS,LOAD_USERS } from "../data/Reducer";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { saveAndDispatch } from "../data/DB";
import { HomeCard } from '../components/HomeCard'
import { Card, Button, Icon, Image } from '@rneui/themed';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';




function HomeScreen({navigation,route}) {
    console.log(route,"route")
    // const {user} = route.params
    // const userId = user.uid

   
  
    // console.log(userId,"USER ID")
    // console.log(user,"HOME PAGE")

    useEffect(() => {
        const loadAction = { type: LOAD_ITEMS };
        saveAndDispatch(loadAction, dispatch);
    }, []);

    useEffect(() => {
        const loadAction = { type: LOAD_USERS };
        saveAndDispatch(loadAction, dispatch);
    }, []);
    const listItems = useSelector((state) => state.listItems);
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <FlatList
                data={listItems}
                renderItem={({ item }) => {
                    return (
                        // <HomeCard item={item}  />
                      

                        <Card>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Divider />
                             <Card.Image style={{objectFit: "contain"}} source={item.imageURL} /> 
                             <Image style={{objectFit: "contain", width: 200, height: 200 }}source={{uri: item.imageURL}} />
                            <Text style={{ marginBottom: 10 }}>
                                {item.description}
                            </Text>
                            <Text style={{ marginBottom: 10 }}>
                                {item.price}
                            </Text>
                            <Button
                            onPress={async () => {
                                navigation.navigate('ProductDetailScreen',{
                                    item: item
                                });
                            }}
                                icon={<Icon name='code' color='#ffffff' />}
                                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                title='VIEW NOW' />
                                
                        </Card>
                    );
                }

                }
            />
        </View>
    );


}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeScreen;
