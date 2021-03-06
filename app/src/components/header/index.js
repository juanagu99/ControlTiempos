
import React from 'react';
import { Avatar } from 'react-native-elements';
import { Appbar,useTheme  } from 'react-native-paper';
import { TouchableOpacity,View } from 'react-native';
import auth from '@react-native-firebase/auth'; //Firebase Authentication Service

export default HeaderComponent = ({ scene, previous, navigation }) => {
    const photo= (auth().currentUser.photoURL)
    const theme = useTheme();
    const { options } = scene.descriptor;
    const title =
      options.headerTitle !== undefined
        ? options.headerTitle
        : options.title !== undefined
        ? options.title
        : scene.route.name;
    return (
        <View>
            <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }}>
            {previous ? (
                <Appbar.BackAction
                onPress={navigation.pop}
                color={theme.colors.primary}
                />
            ) : (
                <TouchableOpacity onPress={() => {navigation.openDrawer();}}>
                    <Avatar size={45}
                            rounded 
                            source={{
                                uri: photo
                            }}/>
                </TouchableOpacity>
            )}
            </Appbar.Header>
        </View>
    );
  };