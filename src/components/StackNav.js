import React, { Component } from 'react';
import { TouchableOpacity, Button, NavigatorIOS, Text, View } from 'react-native';
import { StackNavigator} from 'react-navigation'
import IOSIcon from 'react-native-vector-icons/Ionicons';
import AlbumList from './AlbumList';
import Vlist from './Vlist';


const stackNav = StackNavigator({
    Main: {
        screen: Vlist,
        navigationOptions:({navigation}) => ({
            title: 'Main',
            headerLeft:(
                <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
                    <IOSIcon name="ios-menu" size={30} />
                </TouchableOpacity>
            ),
            headerStyle: { paddingRight: 10, paddingLeft: 10 }
        })
    },
    Detail: {
        screen: AlbumList,
        navigationOptions: (props) => ({
            title: 'Detail',
        })
    }
})

export default stackNav;
