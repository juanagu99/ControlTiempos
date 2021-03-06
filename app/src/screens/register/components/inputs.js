import React from 'react';
import { View, Input,Text} from "react-native";
import { Dimensions} from 'react-native';
const { width } = Dimensions.get('window');
export default function Inputs() {
    return (      
      <View flex={2}>

        <Input
          rounded
          type="email-address"
          placeholder="Correo"          
          icon='user'
          family="AntDesign"
          autoCapitalize="none"
          style={{ width: width * 0.9 }}
          onChangeText={ text => handleChangeEmail(text)}
        />

        <Input
          rounded
          password
          viewPass
          icon='lock'
          family="AntDesign"
          placeholder="Contraseña"
          style={{ width: width * 0.9 }}
          onChangeText={text => handleChangePassword(text)}
        />      
    </View>
    );
}
