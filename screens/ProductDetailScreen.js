import { Button } from '@rneui/themed';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { getApps, initializeApp } from 'firebase/app';
import { onSnapshot, getFirestore, collection } from 'firebase/firestore';
import { firebaseConfig } from '../Secret';
import { useEffect, useState } from 'react';
import { Card, Icon } from '@rneui/themed';
import { saveAndDispatch } from '../data/DB';
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_USER } from '../data/Reducer';



let app;
const apps = getApps();

if (apps.length == 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = apps[0];
}

const auth = getAuth(app);
const db = getFirestore(app);

function ProductDetailScreen({ navigation, route }) {
  const { item } = route.params
  
  //const [currentItem, setCurrentItem] = useState(auth.currentUser?.uid);
  const [currentItem, setCurrentItem] = useState(item);
 
 
  //const [imageURL, setImageURL] = useState('');
  const [favorited, setFavorited] = useState(false);

  const userId = "oFA21EeUbvSj2MyHOxnuOk3c6NE2"

  const user = {
    displayName: "Pratik Mangtani",
    favorites: ["4bT0e8GZVUgRzQq0jjGi"],
    uid: "oFA21EeUbvSj2MyHOxnuOk3c6NE2"
  }
  const [currentUser,setCurrentUser] = useState(user)
  const [favoriteList, setFavoriteList] = useState(user.favorites);
  const listItems = useSelector(state => state.listItems);
  const dispatch = useDispatch();
  console.log(listItems,"LISTITEMS")


  return (
    <View style={styles.container}>

      <View>
        <Button onPress={async () => {
          navigation.navigate('HomeScreen');
        }}>
          Back
        </Button>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.title}>
          <Text style={{ fontSize: 24 }}>{item.name}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: item.imageURL }} />
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button}>Add to Cart</Button>

          <TouchableOpacity
            onPress={() => {
              // setCurrentUser( {
              //   displayName: "Pratik Mangtani",
              //   favorites: ["4bT0e8GZVUgRzQq0jjGi","HhCESIRbEIHGTQQyUqMA"],
              //   uid: "oFA21EeUbvSj2MyHOxnuOk3c6NE2"
              // })
              let newFavorites = [];
              if (user.favorites.includes(item.key)) {
                newFavorites = user.favorites.filter(elem => elem !== item.key);
              } else {
                newFavorites = user.favorites.concat(item.key);
              }
              setFavoriteList(newFavorites)
              
              const action = {
                type: UPDATE_USER,
                payload: {
                  key: user.uid,
                  displayName: user.displayName,
                 favorites: newFavorites
                }
              }

              saveAndDispatch(action,dispatch)
            }}>
           
            <Icon
              //name={currentUser.favorites.includes(item.key) == true ? "heart" : "heart-o"}
              name={favoriteList.includes(item.key) == true ? "heart" : "heart-o"}
              type="font-awesome"
              size={20} />



          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <Text style={[{ fontSize: 18 }, { paddingTop: 10 }]}>Item Description</Text>
          <Text style={[{ fontSize: 14 }, { paddingTop: 6 }]}>{item.description}</Text>
          <Text style={[{ fontSize: 18 }, { paddingTop: 10 }]}>Price: ${item.price}</Text>
        </View>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'left',
    width: '100%',
    paddingTop: 25,
  },
  title: {
    flex: 1,
    width: '100%',
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    flex: 1,
    width: '90%',
    justifyContent: 'left',
    alignItems: 'left',
    paddingTop: 5
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',


  },
  // ♥
  // ♡
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',

    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',

    width: '100%',
    paddingRight: 10
  },
  favoriteButton: {
    flexDirection: 'row',
    width: '100%',
    paddingRight: 10,
  },
  image: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain'


  },
  listContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex',
    alignItems: 'center',
  }
});

export default ProductDetailScreen;