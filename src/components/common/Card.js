import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Router, Scene} from 'react-native-router-flux';

const Card = ({children, onPress}) => {
    return (
        <TouchableHighlight onPress={onPress}>
            <View style={styles.containerStyle}>
                {children}
            </View>
        </TouchableHighlight>
    );
};

const styles = {
    containerStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    }
};

export {Card};
