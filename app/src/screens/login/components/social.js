import React from 'react';
import { View,Button} from "react-native";
import theme from '../../../constants/Themes'
import { AppleButton } from '@invertase/react-native-apple-authentication';

export default function Social() {
      return (          
        <View row center style={{ marginVertical: theme.SIZES.BASE * 1.875 }}>       
          <View middle >
            <Button  title="Google Sign-In" onPress={OnPressGoogle}/>
          </View>              
        </View>
      );
}