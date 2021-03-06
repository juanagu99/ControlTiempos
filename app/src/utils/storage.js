//este archivo contiene los metodos para agregar los datos dentro de la bd de satos del celular en el caso de android sqlite y en ios ...
//import AsyncStorage from '@react-native-community/async-storage';
import * as AsyncStorage from 'expo-secure-store';
//save data in local storage
export const saveItem = async (KeyName,KeyValue) => {
    try{
        AsyncStorage.setItemAsync(KeyName,KeyValue);
        return true;
    }catch(e){
        console.log("Trueee")
        return false;
    }
};
//get data in local storage
export const getItem = async (KeyName)=>{
    try{
        return AsyncStorage.getItemAsync(KeyName);
    }catch(e){
        return false;
    }
};
//clear data in local storage
export const clearAll = async ()=>{
    try{        
        AsyncStorage.deleteItemAsync();
        return true
    }catch(e){
        console.log("Trueee")
        return false;
    }
};
