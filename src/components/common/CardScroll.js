import React from 'react';
import { View, ListView } from 'react-native';

const CardScroll = (props) => {
    return (

            <ListView horizontal={true}>
                {props.children}
            </ListView>

    );
};

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
};


export {CardScroll};
