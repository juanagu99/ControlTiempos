import React from 'react';
import { View, Button,Text } from "react-native";
import theme from '../../../constants/Themes'

export default function Footer() {
  return (  
    <View>
      <Button title="Sign in"onPress={OnPressSignIn}>
      </Button>      
      <Button  title=" ¿No tienes una cuenta? Registrate" onPress={OnPressRegister}>
      </Button>    
    </View>
  );
}
