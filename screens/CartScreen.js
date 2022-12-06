import { Card, Button, Icon } from '@rneui/themed';
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

    const userId = "oFA21EeUbvSj2MyHOxnuOk3c6NE2";



  useEffect(() => {
        const loadAction = { type: LOAD_ITEMS };
        saveAndDispatch(loadAction, dispatch);
    }, []);

  useEffect(() => {
        const loadAction = { type: LOAD_USERS };
        saveAndDispatch(loadAction, dispatch);
    }, []);

    const users = useSelector(state => state.users);

    const currentUser = users.filter(elem => elem.key == userId)
    //console.log(currentUser[0],"CURRENT USER")

    const [cart, setCart] = useState(currentUser[0]["cart"]);
    //console.log(currentUser[0]["cart"], "CURRENTUSERCART");
    const listItems = useSelector(state => state.listItems);
    const dispatch = useDispatch();

    let totalAmount = 0;
    //console.log(listItems,"LISTITEMS");
    //console.log(listItems[0]["key"], "LISTITEMS O");
    /*
    let cartKeys = {};
    cart.forEach((x, i) => {
      cartKeys.push(x["key"]);
      
    });
*/
    let listItemsByKey = {};
    listItems.forEach((x, i) => {
      listItemsByKey[x["key"]] = x;
    });
    console.log(listItemsByKey, 'LISTITEMSBYKEY');

    currentUser[0]["cart"].forEach((x, i) => {
      totalAmount += (x.quantity * listItemsByKey[x.key].price)

    });

    console.log("LISTITEMS", listItems)
    console.log("LISTUSERS", users)
    // const filteredHomes = json.homes.filter(x => x.price <= 1000 && x.sqft >= 500 && x.num_of_beds >=2 && x.num_of_baths >= 2.5);
    // https://stackoverflow.com/questions/2722159/how-to-filter-object-array-based-on-attributes

    const currentUserInfo = users.filter(x => x.uid == userId);
    //console.log("CURRENT_USER", filteredList);
    //console.log(currentUserInfo[0]['cart']);
    console.log(cart);

  
  return (
    <View style={styles.container}>

      <View style={styles.buttonContainer}>
        <Button onPress={async () => {
            navigation.navigate('HomeScreen');
          }}>
          Back
        </Button>
      </View>

        <FlatList

          data = {currentUser[0]["cart"]}
          renderItem={({item}) => {
            {setImageURL(item.imageURL);}
            {console.log(item.quantity, "ITEMQUANTITY")};
            {console.log(listItemsByKey[item.key].price, "ITEMPRICE")};
            
            return (
              <Card style={styles.card}>
                <Card.Title style={styles.titleBar}><Text style={styles.titleText}>{listItemsByKey[item.key].name}</Text> </Card.Title>
                <Card.Divider />
                <View style={styles.cardBody}>
                  <View style={styles.imageBlock}>
                          <Image
                          style={styles.image}
                      source={{uri: listItemsByKey[item.key].imageURL}}/>
                      {console.log('imageURL:')}
                      {console.log(imageURL)}
                  </View>
                  <View style={styles.textBlock}>

      
                      <View style={styles.title}>
                          <Text style={{fontSize: 14}}>Qty: {item.quantity}</Text>
                      </View>
                      <View style={styles.title}>
                          <Text style={{fontSize: 14}}>${listItemsByKey[item.key].price}</Text>
                      </View>  
                  </View>     
                </View>             
                </Card>
            );
          }}
        />
        <View style={styles.totalStyle}>
          <Text style={{fontSize: 18}}>Total Amount: ${totalAmount}</Text>
        </View>
    
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex',
    width: '100%',
    paddingTop: 25,
  },
  buttonContainer: {
    flex: 1,
    width: 25
  },
  card: {
    flex: 1,
    width: 400,

  },
  cardBody: {
    flexDirection: 'row',

  },
  imageBlock: {
    flex: 1,
    height: 100,
    padding: 5,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 3

  },
  textBlock: {
    width: 100,
    padding: 10

  },
  title: {
    paddingTop: 10,

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

    justifyContent: 'flex',
  },
  button: {
    flexDirection: 'row',

    width: '100%',
    paddingRight: 10
  },
  image: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain'
  },
  totalStyle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10

  },
  titleBar: {

    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',

    
  },
  titleText: {

  },
  xThing: {
    width: 40,
    paddingTop: 0,
    
    justifyContent: 'flex-end',

  }
});

export default CartScreen;