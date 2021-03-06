/**
 * Imports
 */
import React, { useState } from 'react';
import {Alert, Dimensions, KeyboardAvoidingView, StyleSheet, View,Text,TextInput ,Button} from 'react-native';
import Social from './components/social'
import Footer from './components/footer'
import Inputs from './components/inputs'
import theme from '../../constants/Themes'
import {validationEmail} from  '../../utils/validations/'
import Loading from '../loading'
import auth from '@react-native-firebase/auth'; //Firebase Authentication Service
import { GoogleSignin } from '@react-native-community/google-signin';
/**
 * Declaration of constant
 */

const { height } = Dimensions.get('window');
/**
 * @PARAM navigation -  Object send since parent class
 * @RETURN View - rendered object
 */
export default ({navigation}) =>  {

  var [Email,setEmail] = useState(''); //Variable where the email will be saved
  var [Password,setPassword] = useState(''); //Variable where the password will be saved
  var [PressSignIn,setPressSignIn] = useState(false);

  /**
  * @return object AsyncFunction - This object is the response of Google
  */
  OnPressGoogle = async () => {       
  try{
      setPressSignIn(true);  
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);         
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
  
  OnPressSignIn = () => {
    try{      
        setPressSignIn(true);
        const validation= validationEmail(Email);
        if(!validation || Password.length <= 5){
          setPressSignIn(false);
          Alert.alert('Invalid','User or password incorrect.');
        }else{
          //login         
          auth().signInWithEmailAndPassword(Email, Password).then(()=>{
            console.log('Login con usuario y contraseña');           
            setPressSignIn(false); 
            //de lo contrario el enrutador directamente llevar aal cliente a home
          })
          .catch( (error) => {            
            setPressSignIn(false); 
            Alert.alert(error.message)
          });
        }
    }catch(error){
      setPressSignIn(false);
      Alert.alert(error.message)
    }
  }

  OnPressRegister = () => {
    navigation.navigate('Register')
  }

  return ( 
    !PressSignIn ? (
        <KeyboardAvoidingView style={styles.container} behavior="height" enabled>        
          <View center style={{ marginTop: theme.SIZES.BASE * 1.875, marginBottom: height * 0.1 }}>            
            <Social/>
          </View>   
          <View flex={2} center>
            <Inputs/>  
            <Footer/>
          </View>       
        </KeyboardAvoidingView>
    ) : ( <Loading/>)
  )
}
//<Footer/>
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