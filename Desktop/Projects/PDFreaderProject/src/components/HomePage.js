// app/routes/Homepage.js

import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage, StyleSheet } from 'react-native';
import {Actions} from 'react-native-router-flux';
import { Button, Card, CardSection, Input, Spinner } from './common';
import AlbumList from './AlbumList';
import Tab from './Tab';

class HomePage extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Tab />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'baseline',
        // justifyContent: 'center',
    },
});


export default HomePage;
