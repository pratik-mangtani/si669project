import { Button } from '@rneui/themed';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { getApps, initializeApp } from 'firebase/app';
import { onSnapshot, getFirestore, collection } from 'firebase/firestore';
import { firebaseConfig } from '../Secret';
import { useEffect, useState } from 'react';

let app;
const apps = getApps();

if (apps.length == 0) { 
  app = initializeApp(firebaseConfig);
} else {
  app = apps[0];
}

const auth = getAuth(app);
const db = getFirestore(app);

function ProductDetailScreen({navigation}) {
  const [displayName, setDisplayName] = useState('');
  //const [currentItem, setCurrentItem] = useState(auth.currentUser?.uid);
  const [currentItem, setCurrentItem] = useState('4bT0e8GZVUgRzQq0jjGi');
  const [users, setUsers] = useState([]);
  const [favorite, setFavorite] = useState(0);
  const [imageURL, setImageURL] = useState('');
  const [favorited, setFavorited] = useState('0');

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

      <View style={styles.listContainer}>
        <FlatList
          data={users.filter(u=>u.key==currentItem)}
          renderItem={({item}) => {
            {setImageURL(item.imageURL);}
            return (
                <View>
                    <View style={styles.title}>
                        <Text style={{fontSize: 24}}>{item.name}</Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image
                        style={styles.image}
                    source={{uri: imageURL}}/>
                    {console.log('imageURL:')}
                    {console.log(imageURL)}
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button style={styles.button}>Add to Cart</Button>
                        
                        <Button onPress={async () => { setFavorited('1'); if (favorited == '1') {setFavorited('0')} else {setFavorited('1') }}}> {favorited == '1' ? '♥' : '♡' }</Button>
                    </View>
                    <View style={styles.body}>
                        <Text style={[{fontSize: 18}, {paddingTop:10}]}>Item Description</Text>
                        <Text style={[{fontSize: 14}, {paddingTop:6}]}>{item.description}</Text>
                        <Text style={[{fontSize: 18}, {paddingTop:10}]}>Price: ${item.price}</Text>
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