import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState,useEffect } from "react";
import { LOAD_ITEMS,LOAD_USERS } from "../data/Reducer";
import { saveAndDispatch } from "../data/DB";





export default function Favourites() {
 
  

  const listItems = useSelector((state) => state.listItems);

  //console.log(listItems,"listItems")
  
 userId= "oFA21EeUbvSj2MyHOxnuOk3c6NE2"

//load users
 useEffect(() => {
  const loadAction = { type: LOAD_USERS };
  saveAndDispatch(loadAction, dispatch);
}, []);
//const users = useSelector((state) => state.users);
//console.log(users)
const dispatch = useDispatch();

//find the record of the current user 
//let currentUser = users.filter(elem => elem.uid=userId)
//console.log(currentUser,"CURRENT USER")
 
  return (
    <View style={styles.container}>
       <View>
       <FlatList
                data={listItems}
                renderItem={({ item }) => {
                    return (
                        // <HomeCard item={item}  />
                      

                        <Card>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Divider />
                             {/* <Card.Image style={{objectFit: "contain"}} source={item.imageURL} />  */}
                             <Image style={{objectFit: "contain", width: 350, height: 200 }}source={{uri: item.imageURL}} />
                           
                            
                           <View style={styles.cardBottom}>
                           <Text style={{ marginBottom: 10 }}>
                                {item.price}
                            </Text>
                            <Icon
                                  name="heart"
                                  type="font-awesome"
                                  size={20}/>

                           </View>
                                
                                
                        </Card>
                    );
                }

                }
            />
           
          
       </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBottom:{
    flexDirection: 'row',
    flex: 0.3,
    justifyContent: 'space-around'
    
  }
});
