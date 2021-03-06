import React, {useState} from 'react';
import { View,StyleSheet, Button,Text,Alert } from 'react-native';
import auth from '@react-native-firebase/auth'; //Firebase Authentication Service
function Verificate(){    
    
    const [disabledButton,setdisabledButton] = useState(false)

    const onPress= ()=> {   
        auth().currentUser.sendEmailVerification()
        .then(function() {            
            setdisabledButton(true);
            console.log('El correo se envio correctamente');
            auth().signOut()
                .then(function() {
                console.log('La sesion ha caducado');})
                .catch(function(error) {
                console.log('no se pudo ejecutar la accion de cerrar sesion');});
         })
        .catch(function(error) {
            setdisabledButton(false);
            console.log('No se pudo enviar el correo' + error.message);
        });
    }
    const onPresslogout= ()=> {   
        auth().signOut()
        .then(function() {
        console.log('La sesion ha caducado');})
        .catch(function(error) {
        console.log('no se pudo ejecutar la accion de cerrar sesion');});
    }

    return(
        <View style={styles.container}>
            <View>
                <Button disabled={disabledButton} onPress={onPress} title="Verifica tu cuenta"/>              
                <Button disabled={disabledButton} onPress={onPresslogout} title="Logout"/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      margin: 50
    }
  });

export default Verificate;