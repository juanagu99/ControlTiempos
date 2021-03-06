import React, { useState }  from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  View
} from 'react-native';
import theme from '../../constants/Themes'
import Social from './components/social'
import Footer from './components/footer'
import Inputs from './components/inputs'
import {validationEmail} from '../../utils/validations'
import auth from '@react-native-firebase/auth'; //Firebase Authentication Service
import { appleAuth } from '@invertase/react-native-apple-authentication';

import Loading from '../loading'
/**
 * Declaration of constant
 */

const { height } = Dimensions.get('window');

export default ({navigation}) => {
  
  var [Email,setEmail] = useState(''); //Variable where the email will be saved
  var [Password,setPassword] = useState(''); //Variable where the password will be saved
  var [PressSignIn,setPressSignIn] = useState(false);


    /**
  * @return object AsyncFunction - This object is the response of Google
  */
  OnPressGoogle = async () => {       
  try{
      setPressSignIn(true);
      // Start the sign-in request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // Ensure Apple returned a user identityToken
      if (!appleAuthRequestResponse.identityToken) {
        setPressSignIn(false);
        Alert.alert('Error de conexión');
        throw 'Apple Sign-In failed - no identify token returned';
      }

      // Create a Firebase credential from the response
      const { identityToken, nonce } = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

      // Sign the user in with the credential
      return auth().signInWithCredential(appleCredential);      
    }catch(error){
      setPressSignIn(false);
      Alert.alert(error.message);
    }
  }  

  handleChangeEmail = (value) => {
    setEmail(value);
  }

  handleChangePassword = (value) => {
    setPassword(value);
  }
  
  OnPressRegister = () => {
    try{      
        setPressSignIn(true);
        const validation= validationEmail(Email);
        if(!validation || Password.length <= 5){
          setPressSignIn(false);
          Alert.alert('Error','El correo debe tener la estructura Correo@correo.com y la contraseña debe tener minimo 6 caracteres');
        }else{          
          
          auth().createUserWithEmailAndPassword(Email, Password)
            .then(()=>{
              console.log('se creo correctamente el usuario en firebase con user and password');
              //login         
              firebase.auth().signInWithEmailAndPassword(Email, Password).then(()=>{
                console.log('Login con usuario y contraseña');            
                setPressSignIn(false); 
                //de lo contrario el enrutador directamente llevar aal cliente a home
              })
              .catch( (error) => {            
                setPressSignIn(false); 
                Alert.alert(error.message)
              });
              //
            })
            .catch(function(error) {       
              Alert.alert(error.message)
              setPressSignIn(false); 
          });
        }
    }catch(error){
      setPressSignIn(false);
      Alert.alert(error.message)
    }
  }

  OnPressSignIn = () => {
    navigation.navigate('Login')
  }

  return ( 
    !PressSignIn ? (
        <KeyboardAvoidingView style={styles.container} behavior="height" enabled>        
          <View center style={{ marginTop: theme.SIZES.BASE * 1.875, marginBottom: height * 0.1 }}>            
            <Social/>          
          </View>        
          <View flex={2} center space="evenly">
              <Inputs/> 
              <Footer/>
          </View>
        </KeyboardAvoidingView>
    ) : ( <Loading/>)
  )  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: theme.SIZES.BASE * 0.3,
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE,
  }
});
