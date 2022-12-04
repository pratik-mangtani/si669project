import { Button } from '@rneui/themed';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { getApps, initializeApp } from 'firebase/app';
import { onSnapshot, getFirestore, collection } from 'firebase/firestore';
import { firebaseConfig } from '../Secret';
import { useEffect, useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';


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
  const [displayName, setDisplayName] = useState('');
  //const [currentItem, setCurrentItem] = useState(auth.currentUser?.uid);
  const [currentItem, setCurrentItem] = useState('4bT0e8GZVUgRzQq0jjGi');
  const [users, setUsers] = useState([]);
  const [favorite, setFavorite] = useState(0);
  const [imageURL, setImageURL] = useState('');
  const [favorited, setFavorited] = useState('0');

  const [selected, setSelected] = useState("");
  
  const data = [
      {key:'0', value:'0', disabled:false},
      {key:'1', value:'1', disabled:false},
      {key:'2', value:'2'},
      {key:'3', value:'3'},
      {key:'4', value:'4', disabled:false},
  ]
    // ♥
  // ♡

  useEffect(()=>{
    //console.log(currUserId);

    onSnapshot(collection(db, 'furnitureCollection'), qSnap => {
      let newUsers = [];
      qSnap.forEach(docSnap => {
        console.log(docSnap.id);
        let newItem = docSnap.data();
        newItem.key = docSnap.id;
        newUsers.push(newItem);
      });
      console.log('currentItem:', currentItem)
      console.log('updated users:', newUsers);
      setUsers(newUsers);
    })
  }, []);

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
          data={users.filter(u=>u.key==currentItem)}
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
                    <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
    />
                    
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