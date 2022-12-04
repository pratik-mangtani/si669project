import { Button } from '@rneui/themed';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { getApps, initializeApp } from 'firebase/app';
import { onSnapshot, getFirestore, collection, connectFirestoreEmulator } from 'firebase/firestore';
import { firebaseConfig } from '../Secret';
import { useEffect, useState } from 'react';
import { Card, Icon } from '@rneui/themed';
import { saveAndDispatch } from '../data/DB';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_USERS, UPDATE_USER } from '../data/Reducer';


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

  useEffect(() => {
      const loadAction = { type: LOAD_USERS };
      saveAndDispatch(loadAction, dispatch);
  }, []);

  const users = useSelector(state => state.users);

  console.log(users);
  console.log()



  const user = {
    displayName: "Pratik Mangtani",
    favorites: ["4bT0e8GZVUgRzQq0jjGi"],
    cart: [{"key":"4bT0e8GZVUgRzQq0jjGi", "quantity":1}],
    uid: "oFA21EeUbvSj2MyHOxnuOk3c6NE2"
  }
  const [currentUser,setCurrentUser] = useState(user);
  const [cart, setCart] = useState(user.cart);
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
          <Button style={styles.button}
            onPress={() => {
              // setCurrentUser( {
              //   displayName: "Pratik Mangtani",
              //   favorites: ["4bT0e8GZVUgRzQq0jjGi","HhCESIRbEIHGTQQyUqMA"],
              //   uid: "oFA21EeUbvSj2MyHOxnuOk3c6NE2"
              // })
              let newCart = [];
              let newItem = {"key": item.key, "quantity": 1};
              console.log("ITEM KEY", item.key);

              //const filteredBooks = books.filter(val => val.areas.includes(filterValue));
              //const testFilter = user.cart.filter(x => x.key == item.key);
              //console.log("TESTFILTER",testFilter);
              //user.cart.forEach((x, i) => console.log("ITEM KEY", x.key));
              let match = false;
              cart.forEach((x, i) => {
                // extended version of filter(); checking if item already in cart
                console.log("TEST", x.key, item.key)
                if (x.key == item.key) {
                  console.log("true match")
                  match = true;

                  x.quantity += 1;
                  newCart.push({"key": x.key, "quantity": x.quantity});
                } else {
                  console.log("false match")
                  newCart.push({"key": x.key, "quantity": x.quantity});
                }

              });
              if (!match) {
                console.log("ADDING NEW ITEM");
                newCart.push({"key": item.key, "quantity":1});

              };
              console.log("NEWCART", newCart);
              setCart(newCart);

              /*
              if (user.cart.filter(x => x.key == item.key)) {
                const existingItemInCart = user.cart.filter(x => x["key"] == item.key);
                existingItemInCart["quantity"] == 2;
                user.cart[item.key]
                console.log(existingItemInCart);
                console.log("ITEM HERE");
                console.log(user.cart)
              } else {
                let newItem = {"key": item.key, "quantity": 1};
                console.log(newItem);
                console.log("ITEM NOT HERE");
                console.log(user.cart)
              }
              */
              /*
              if (user.cart.includes(item.key)) {
                newCart = user.cart.filter(elem => elem !== item.key);
              } else {
                newCart = user.cart.concat({"key": item.key, "quantity": 1});
              }
              console.log("NEWCART", newCart);
              */

              

              const action = {
                type: UPDATE_USER,
                payload: {
                  key: user.uid,
                  displayName: user.displayName,
                  cart: newCart,
                  favorites: user.favorites
                }
              }

              saveAndDispatch(action,dispatch)
              
            }}
            >
              Add to Cart
          </Button>

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
              console.log("NEWFAVORITES", newFavorites);
              
              const action = {
                type: UPDATE_USER,
                payload: {
                  key: user.uid,
                  displayName: user.displayName,
                  cart: user.cart,
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