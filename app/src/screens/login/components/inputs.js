import React from 'react';
import { View, TextInput,Button,Dimensions} from "react-native";
import theme from '../../../constants/Themes'
const { width } = Dimensions.get('window');
export default function Inputs() {
    return (      
      <View>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={ text => handleChangeEmail(text)}
            />

            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={text => handleChangePassword(text)}
            />

            <Button title="¿Olvidaste tu contraseña?"></Button>
      </View>
    );
}
