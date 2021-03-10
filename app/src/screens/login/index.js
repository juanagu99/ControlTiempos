/**
 * Imports
 */
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput,
  Platform,
  StyleSheet ,
  StatusBar,
  Alert
} from 'react-native';
import Social from './components/social'
import Footer from './components/footer'
import Inputs from './components/inputs'
import theme from '../../constants/Themes'
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {validationEmail} from  '../../utils/validations'
import Loading from '../loading'
import auth from '@react-native-firebase/auth'; //Firebase Authentication Service
import { GoogleSignin } from '@react-native-community/google-signin';
import { useTheme } from 'react-native-paper';
/**dat
 * Declaration of constant
 */

//const { height } = Dimensions.get('window');
/**
 * @PARAM navigation -  Object send since parent class
 * @RETURN View - rendered object
 */
export default ({navigation}) =>  {

  var [Email,setEmail] = useState(""); //Variable where the email will be saved
  var [Password,setPassword] = useState(""); //Variable where the password will be saved
  var [PressSignIn,setPressSignIn] = useState(false);
  var [PressSecurityText,setPressSecurityText] = useState(true);
  var [ValidFormatEmail,setValidFormatEmail] = useState(false);

  const { colors } = useTheme();
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

  function OnPresSecureTextEntry(){
    setPressSecurityText(!PressSecurityText);
  }

  const handleValidEmail = (val) => {
    try{
      const validation= validationEmail(val);
      if(!validation){
        setValidFormatEmail(false);
      }else{
        setValidFormatEmail(true);
      }
    }catch(error){
      setValidFormatEmail(false);
    }
  }

  return ( 
    !PressSignIn ? (
      /*
        <KeyboardAvoidingView style={styles.container} behavior="height" enabled>        
          <View center style={{ marginTop: theme.SIZES.BASE * 1.875, marginBottom: height * 0.1 }}>            
            <Social/>
          </View>   
          <View flex={2} center>
            <Inputs/>  
            <Footer/>
          </View>       
        </KeyboardAvoidingView>*/
    <View style={styles.container}>
        <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
          <Text style={styles.text_header}>Control de tiempos</Text>
        </View>
        <Animatable.View 
          animation="fadeInUpBig"
          style={[styles.footer, {
              backgroundColor: colors.background
          }]}
        >
          <Text style={[styles.text_footer, {
              color: colors.text
          }]}>Usuario</Text>
          <View style={styles.action}>
              <FontAwesome 
                  name="user-o"
                  color={colors.text}
                  size={20}
              />
              <TextInput 
                  placeholder="Usuario@dominio.com"
                  placeholderTextColor="#666666"
                  style={[styles.textInput, {
                      color: colors.text
                  }]}
                  autoCapitalize="none"
                  onChangeText={(val) => handleChangeEmail(val)}
                  onEndEditing={(e)=>handleValidEmail(e.nativeEvent.text)}
              />
                        
              { ValidFormatEmail ? 
              <Animatable.View
                  animation="bounceIn"
              >
                 <Feather 
                      name="check-circle"
                      color="green"
                      size={20}
                  />
              </Animatable.View>
              : null
             /* : <Animatable.View
              animation="bounceIn"
              >
             <Feather 
                  name="x-circle"
                  color="#FA0000"
                  size={20}
              />
              </Animatable.View>*/}
          </View>
          <Text style={[styles.text_footer, {
              color: colors.text,
              marginTop: 35
          }]}>Contraseña</Text>
          <View style={styles.action}>
              <Feather 
                  name="lock"
                  color={colors.text}
                  size={20}
              />
              <TextInput 
                  placeholder="Contraseña"
                  placeholderTextColor="#666666"
                  secureTextEntry={PressSecurityText ? true : false}
                  style={[styles.textInput, {
                      color: colors.text
                  }]}
                  autoCapitalize="none"
                  onChangeText={(val) => handleChangePassword(val)}
              />
              <TouchableOpacity
                  onPress={ () => OnPresSecureTextEntry() }
              >
                  { PressSecurityText ? 
                  <Feather 
                      name="eye-off"
                      color="grey"
                      size={20}
                  />
                  :
                  <Feather 
                      name="eye"
                      color="grey"
                      size={20}
                  />
                  }
              </TouchableOpacity>
          </View>        
          <TouchableOpacity>
              <Text style={{color: '#009387', marginTop:15}}>Recuperar contraseña</Text>
          </TouchableOpacity>
          <View style={styles.button}>              

              <TouchableOpacity
                  style={styles.signIn}
                  onPress={() => {OnPressSignIn()}}
              >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Ingresar</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}
                  style={[styles.signIn, {
                      borderColor: '#009387',
                      borderWidth: 1,
                      marginTop: 15,
                      marginBottom:100
                  }]}
              >
                  <Text style={[styles.textSign, {
                      color: '#009387'
                  }]}>Registrarse</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style={styles.signIn}
                  onPress={ () => OnPressGoogle() }
                >                           
                    <FontAwesome 
                        name="google"
                        color="#009387"
                        size={50}/>               
              </TouchableOpacity>
          </View>
      </Animatable.View>
    </View>
    ) : ( <Loading/>)
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });
