/**
 * Declaration of variables
 */
import React,{useState, useEffect} from 'react';
import Container from './app/src/navigators'
import Disconnect from './app/src/screens/disconnect'
import {useNetInfo} from "@react-native-community/netinfo";
import {REACT_APP_WEB_CLIENT_ID} from "@env"
import { GoogleSignin } from '@react-native-community/google-signin';

/**
 * @Return View or NavigationContainer - Description: Parent Container
 */

GoogleSignin.configure({webClientId:REACT_APP_WEB_CLIENT_ID})

const App= () => {
  return (    
    useNetInfo().isConnected  ? (          
      <Container/> 
    ):(
      <Disconnect/>
    )    
  )
};

export default App;
