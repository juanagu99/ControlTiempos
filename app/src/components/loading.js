import React from 'react';
import { View,StyleSheet,ActivityIndicator,Text } from 'react-native';
import { Overlay } from 'react-native-elements';
function Loading(props){
  const {visible} = props;      
  return (   
      <Overlay isVisible={visible}>
            <View>
                <ActivityIndicator></ActivityIndicator>
            </View>
      </Overlay>
    
  );   
};
export default Loading;