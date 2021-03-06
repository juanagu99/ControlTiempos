import React from 'react';
import { View,StyleSheet} from "react-native";
import theme from '../../../constants/Themes'
import { AppleButton } from '@invertase/react-native-apple-authentication';

export default function Social() {
      return (          
        <View row center style={{ marginVertical: theme.SIZES.BASE * 1.875 }}>       
          <View >
            <AppleButton  buttonStyle={AppleButton.Style.WHITE}
                          buttonType={AppleButton.Type.SIGN_IN}
                          style={{
                            width: 160,
                            height: 45,
                          }}
                          onPress={() => OnPressGoogle()}
            />
          </View>              
        </View>
      );
}
const styles = StyleSheet.create({
   social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
});