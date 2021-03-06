/**
 * Imports * 
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {HeaderComponent} from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    HomeScreen,
    TinderScreen
} from '../../screens'

const STACK = createStackNavigator();
const TAB = createBottomTabNavigator();

/**
 * @return NavigationContainer
 */ 
function LowerMenuNavigator() {
    return(
        <TAB.Navigator initialRouteName="Home" activeColor="#fff">                
            <TAB.Screen name="Home" 
                        component={HomeScreen} 
                        options={{
                        tabBarLabel: 'Home',
                        tabBarColor: '#009387',
                        tabBarIcon: ({ color }) => ( <Icon name="ios-home" color={color} size={26} />)}} 
            />      
            <TAB.Screen name="Tinder"
                         component={TinderScreen} 
                         options={{
                            tabBarLabel: 'Tinder',
                            tabBarColor: '#1f65ff',
                            tabBarIcon: ({ color }) => (<Icon name="ios-notifications" color={color} size={26} />)}}
            />          
        </TAB.Navigator>
    )
}

 /**
 * @return NavigationContainer
 */
export default function LoggedUsersNavigator(){    
    return(
        <STACK.Navigator    
                    headerMode="screen" 
                    screenOptions={{  header: ({ scene,previous,navigation }) => (<HeaderComponent navigation={navigation} previous={previous} scene={scene} />)}}>
                <STACK.Screen name="Container" component={LowerMenuNavigator} />                  
        </STACK.Navigator>
    )
}