/**
 * Imports * 
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    LoginScreen,
    RegisterScreen 
} from '../../screens';

const STACK = createStackNavigator();

/**
 * @return NavigationContainer
 */
export default function LoginAndRegisterNavigator(){
    return(
        <STACK.Navigator headerMode="none">    
            <STACK.Screen name="Login" component={LoginScreen} />     
            <STACK.Screen name="Register" component={RegisterScreen} />                                        
        </STACK.Navigator>
    )      
}