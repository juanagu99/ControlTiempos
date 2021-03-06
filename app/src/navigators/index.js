/**
 * Imports * 
 */
import React,{useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginAndRegisterNavigator from './login_and_register_navigator'
import auth from '@react-native-firebase/auth'; //Firebase Authentication Service
import {DrawerComponent} from '../components/drawer'
import LoggedUsersNavigator from './logged_users_navigator'

import {
    LoadingScreen
} from '../screens'

/**
 * Declaration of constans 
 */
const DRAWER = createDrawerNavigator();

export default function Navigators(){
    const [USER,setUser] = useState(null); //used to verify login
    const [SERVICE_CONNECTION,setServiceConnection] = useState(false); //Used when trying to connect to the firebase service

    // Handle user state changes
    const onAuthStateChanged = (user) => {
        setUser(user);
        if (!SERVICE_CONNECTION) setServiceConnection(true);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);        
        return subscriber; // unsubscribe on unmount
    }, []);

    return (
        <NavigationContainer>
            { SERVICE_CONNECTION ? (
                    USER ? (
                        //When user login*
                        <DRAWER.Navigator drawerContent={ props => <DrawerComponent {...props} />} >
                             <DRAWER.Screen name="Logged Navigator" component={LoggedUsersNavigator} />
                        </DRAWER.Navigator>
                    ):(
                        //When user not login                  
                        <LoginAndRegisterNavigator/>
                    )                         
                ):(
                    <LoadingScreen/>

                )       
            }
        </NavigationContainer>   
    )
}