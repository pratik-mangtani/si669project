import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";
import { LOAD_ITEMS, LOAD_USERS, UPDATE_USER } from "../data/Reducer";
import { saveAndDispatch } from "../data/DB";





export default function Favourites() {


  //load items
  const listItems = useSelector((state) => state.listItems);
  userId = "oFA21EeUbvSj2MyHOxnuOk3c6NE2"

  //load users
  useEffect(() => {
    const loadAction = { type: LOAD_USERS };
    saveAndDispatch(loadAction, dispatch);
  }, []);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  console.log(users)

  //find the record of the current user 
  const currentUser = users.filter(elem => elem.key == userId)
  console.log(currentUser[0],"CURRENT USER")

  //find favorited items from listItems
  const favorites = listItems.filter(elem => currentUser[0].favorites.includes(elem.key))
  console.log(favorites, "FAVORITES")
  const [favoriteList, setFavoriteList] = useState(favorites);
  //setFavoriteList(favorites)
  
  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={favorites}
          renderItem={({ item }) => {
            return (
              // <HomeCard item={item}  />


              <Card>
                <Card.Title>{item.name}</Card.Title>
                <Card.Divider />
                {/* <Card.Image style={{objectFit: "contain"}} source={item.imageURL} />  */}
                <Image style={{ objectFit: "contain", width: 350, height: 200 }} source={{ uri: item.imageURL }} />


                <View style={styles.cardBottom}>
                  <Text style={{ marginBottom: 10 }}>
                    {item.price}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                     const newFavorites = favoriteList.filter(elem=> elem.key !=item.key
                     )//get only id 
                    
                     setFavoriteList(newFavorites)
                     const favListDispatch = newFavorites.map(e=>e=e.key)
                     console.log(favListDispatch)

                     //console.log(newFavorites,"newFavorites")

                     const action = {
                      type: UPDATE_USER,
                      payload: {
                        key: currentUser[0].key,
                        displayName: currentUser[0].displayName,
                        cart: currentUser[0].cart,
                       favorites: favListDispatch
                      }
                    }
      
                    saveAndDispatch(action,dispatch)
                    }}>
                    <Icon
                      name="heart"
                      type="font-awesome"
                      size={20} />
                  </TouchableOpacity>


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
  cardBottom: {
    flexDirection: 'row',
    flex: 0.3,
    justifyContent: 'space-around'

  }
});
