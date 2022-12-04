import { Button } from '@rneui/themed';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_ITEMS,LOAD_USERS } from "../data/Reducer";
import { getApps, initializeApp } from 'firebase/app';
import { onSnapshot, getFirestore, collection } from 'firebase/firestore';
import { firebaseConfig } from '../Secret';
import { useEffect, useState } from 'react';
import { saveAndDispatch } from "../data/DB";

//import { SelectList } from 'react-native-dropdown-select-list';


let app;
const apps = getApps();

if (apps.length == 0) { 
  app = initializeApp(firebaseConfig);
} else {
  app = apps[0];
}

const auth = getAuth(app);
const db = getFirestore(app);

function CartScreen({navigation}) {
    //const [currentItem, setCurrentItem] = useState(auth.currentUser?.uid);
    //const [currentItem, setCurrentItem] = useState(item);
  
  
    const [imageURL, setImageURL] = useState('');
    const [favorited, setFavorited] = useState(false);

    const userId = "oFA21EeUbvSj2MyHOxnuOk3c6NE2"

    useEffect(() => {
        const loadAction = { type: LOAD_USERS };
        saveAndDispatch(loadAction, dispatch);
    }, []);

    const users = useSelector(state => state.users);

    const currentUser = users.filter(elem => elem.key == userId)
    console.log(currentUser[0],"CURRENT USER")



    const user = {
      displayName: "Pratik Mangtani",
      favorites: ["4bT0e8GZVUgRzQq0jjGi"],
      cart: [{"key":"4bT0e8GZVUgRzQq0jjGi", "quantity":1}],
      uid: "oFA21EeUbvSj2MyHOxnuOk3c6NE2"
    }
    const [cart, setCart] = useState(currentUser[0]["cart"]);
    const [favoriteList, setFavoriteList] = useState(user.favorites);
    const listItems = useSelector(state => state.listItems);
    const dispatch = useDispatch();
    console.log(listItems,"LISTITEMS")

    // ♥
  // ♡


  useEffect(() => {
        const loadAction = { type: LOAD_ITEMS };
        saveAndDispatch(loadAction, dispatch);
    }, []);

  useEffect(() => {
        const loadAction = { type: LOAD_USERS };
        saveAndDispatch(loadAction, dispatch);
    }, []);
    console.log("LISTITEMS", listItems)
    console.log("LISTUSERS", users)
    // const filteredHomes = json.homes.filter(x => x.price <= 1000 && x.sqft >= 500 && x.num_of_beds >=2 && x.num_of_baths >= 2.5);
    // https://stackoverflow.com/questions/2722159/how-to-filter-object-array-based-on-attributes

    const currentUserInfo = users.filter(x => x.uid == user.uid);
    //console.log("CURRENT_USER", filteredList);
    //console.log(currentUserInfo[0]['cart']);
    console.log(cart);

  
  return (
    <View style={styles.container}>

      <View>
        <Button onPress={async () => {
            navigation.navigate('HomeScreen');
          }}>
          Back
        </Button>
      </View>
      <View>
        <Text>Cart Screen</Text>
      </View>

      <View style={styles.listContainer}>
        
        <FlatList
          data = {cart}
          renderItem={({item}) => {
            {setImageURL(item.imageURL);}
            return (
                <View style={styles.cartListing}>
                    
                    <View style={styles.imageContainer}>
                        <Image
                        style={styles.image}
                    source={{uri: imageURL}}/>
                    {console.log('imageURL:')}
                    {console.log(imageURL)}
                    </View>
                    <View style={styles.title}>
                        <Text style={{fontSize: 20}}>{item.name}</Text>
                    </View>
                    <View style={styles.title}>
                        <Text style={{fontSize: 20}}>${item.price}</Text>
                    </View>                    
                </View>
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
    justifyContent: 'flex-start',
    alignItems: 'left',
    width: '100%',
    paddingTop: 25,
  },
  cartListing: {
    flex: 1,
    width: '100%',
    height: 200,
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10

  },
  title: {
    paddingTop: 10,
    justifyContent: 'left',
    alignItems: 'left'
  },
  body: {
    flex: 1,
    width: '90%',
    justifyContent: 'left',
    alignItems: 'left',
    paddingTop: 5
  },
  imageContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 3


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

export default CartScreen;