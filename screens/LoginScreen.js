
import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getApps, initializeApp } from 'firebase/app';

import { getFirestore, setDoc, doc } from 'firebase/firestore';

import { Button } from '@rneui/themed';
import { firebaseConfig } from '../Secret';
import AsyncStorage from '@react-native-async-storage/async-storage';

let app;
const apps = getApps();

if (apps.length == 0) { 
  app = initializeApp(firebaseConfig);
} else {
  app = apps[0];
}

const auth = getAuth(app);
const db = getFirestore(app);

function SigninBox({navigation}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginTitle}>
        <Text style={{fontWeight: '600', fontSize: '16'}}>Sign In</Text>
      </View>
      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}>Email: </Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput 
            style={styles.loginInputBox}
            placeholder='enter email address' 
            autoCapitalize='none'
            spellCheck={false}
            onChangeText={text=>setEmail(text)}
            value={ email }
          />
        </View>
      </View>
      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}>Password: </Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput 
            style={styles.loginInputBox}
            placeholder='enter password' 
            autoCapitalize='none'
            spellCheck={false}
            secureTextEntry={true}
            onChangeText={text=>setPassword(text)}
            value={password}
          />
        </View>
      </View>
      <View style={styles.loginRow}>
        <Button
          onPress={async () => {
            try {
              await signInWithEmailAndPassword(auth, email, password);
              navigation.navigate('HomeScreen');
            } catch(error) {
              Alert.alert("Sign Up Error", error.message,[{ text: "OK" }])
            }
          }}
        >
          SIGN IN
        </Button>  
      </View>
    </View>
  );
}

function SignupBox({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');


  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginTitle}>
        <Text style={{fontWeight: '600', fontSize: '16'}}>Sign Up</Text>
      </View>
      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}>Display Name: </Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput 
            style={styles.loginInputBox}
            placeholder='enter display name' 
            autoCapitalize='none'
            spellCheck={false}
            onChangeText={text=>setDisplayName(text)}
            value={displayName}
          />
        </View>
      </View>
      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}>Email: </Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput 
            style={styles.loginInputBox}
            placeholder='enter email address' 
            autoCapitalize='none'
            spellCheck={false}
            onChangeText={text=>setEmail(text)}
            value={email}
          />
        </View>
      </View>

      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}>Password: </Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput 
            style={styles.loginInputBox}
            placeholder='enter password' 
            autoCapitalize='none'
            spellCheck={false}
            secureTextEntry={true}
            onChangeText={text=>setPassword(text)}
            value={password}
          />
        </View>
      </View>
      <View style={styles.loginRow}>
        <Button
          onPress={async () => {
            try {
              const userCred = await createUserWithEmailAndPassword(auth, email, password);
              await setDoc(doc(db, 'users', userCred.user.uid), {displayName: displayName, uid: userCred.user.uid});
            } catch(error) {
              Alert.alert("Sign Up Error", error.message,[{ text: "OK" }])
            }
          }}
        >
          SIGN UP
        </Button>  
      </View>
    </View>
  );
}

function LoginScreen({navigation}) {

  const [loginMode, setLoginMode] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        console.log('signed in! user:', user);
        const storeData = async (value) => {
          try {
            const jsonValue = JSON.stringify(user)
            await AsyncStorage.setItem('@user', jsonValue)
          } catch (e) {
            // saving error
          }
        }
        navigation.navigate('HomeScreen',{
          user :user
        });
      } else {
        console.log('user is signed out!');
        navigation.navigate('Login');
      }
    })
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        {loginMode?
          <SigninBox navigation={navigation}/>
        :
          <SignupBox/>
        }
        <View style={styles.modeSwitchContainer}>
        { loginMode ? 
          <Text>New user? 
            <Text 
              onPress={()=>{setLoginMode(!loginMode)}} 
              style={{color: 'blue'}}> Sign up </Text> 
            instead
          </Text>
        :
          <Text>Returning user? 
            <Text 
              onPress={()=>{setLoginMode(!loginMode)}} 
              style={{color: 'blue'}}> Sign in </Text> 
            instead
          </Text>
        }
      </View>
        </View>
      
  
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingTop: 0
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'left',
    color: 'grey',
    //backgroundColor: 'tan'
  },
  loginTitle: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  loginContainer: {
    justifyContent: 'flex-start',
    alignItems: 'left',
    width: '100%',
    //paddingBottom: '10%',
    //backgroundColor: 'lightblue'
  },
  loginHeader: {
    width: '100%',
    paddingBottom: '3%',
    justifyContent: 'left',
    alignItems: 'left',
    //backgroundColor: 'tan'
  },
  loginHeaderText: {
    color: 'grey',
    paddingBottom: '5%'
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'left',
    width: '100%',

    //backgroundColor: 'pink'
  },
  loginLabelContainer: {
    flex: 0.4,
    justifyContent: 'left',
    alignItems: 'flex'
  },
  loginLabelText: {
    fontSize: 12
  },
  loginInputContainer: {
    flex: 0.5,
    justifyContent: 'left',
    alignItems: 'flex-start',
    width: '100%'
  },
  loginInputBox: {
    width: '100%',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 6,
    fontSize: 18,
    padding: '2%'
  },
  modeSwitchContainer:{
    //flex: 0.1,
    //justifyContent: 'flex-start',
    //alignItems: 'left',
    width: '100%',
    paddingTop: '2%'
  },
  loginButtonRow: {
    width: '100%',
    justifyContent: 'flex-start', 
    alignItems: 'left'
  },
  listContainer: {
    flex: 0.7, 
    backgroundColor: '#ccc',
    alignItems: 'left',
    justifyContent: 'flex-start',
    width: '100%', 
  },
});

export default LoginScreen;