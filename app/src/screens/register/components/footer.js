import React from 'react';
import { View, Button,Text } from "react-native";
import theme from '../../../constants/Themes'
export default function Footer() {
  return (  
    <Block>
      <Button round color={theme.COLORS.BLACK} onPress={OnPressRegister}>
        Registrarse
      </Button>
      <Button color="transparent" iconFamily="FontAwesome" shadowless onPress={OnPressSignIn}>
        <Text center color={theme.COLORS.GREY} size={theme.SIZES.FONT * 0.75}>
          {"Inicia sesión con cuenta existente"}
        </Text>
      </Button>     
    </Block>
  );
}
