import React, {Component} from 'react';
import { Text, View, Image, Linking, Dimensions } from 'react-native';
import {Card, Button, CardSection} from './common';
import TabNavigator from 'react-native-tab-navigator';


const AlbumDetail = ( {album} ) => {

    const { time, date, thumbnail_image, image, url, number } = album;
    const {
        thumbnailStyle,
        headerContentStyle,
        thumbnailContainerStyle,
        headerTextStyle,
        imageStyle,
        numberPlateStyle,
    } = styles;

    return (
        <Card>
            <CardSection>
                <View style={thumbnailContainerStyle}>
                    <Image
                        style={thumbnailStyle}
                        source={{ uri: thumbnail_image }}
                    />
                </View>
                <View style={headerContentStyle}>
                    <Text style={headerTextStyle}>{time}</Text>
                    <Text>{date}</Text>
                </View>
                <View style={numberPlateStyle}>
                    <Button onPress={() =>
                        Linking.openURL(url)
                    }>
                        {number}
                    </Button>
                </View>

            </CardSection>

            <CardSection>
                <Image
                    style={imageStyle}
                    source={{ uri: image}}
                />
            </CardSection>

            <CardSection>
                <Button onPress={() => Linking.openURL(url)}>
                  Note
                </Button>
                <Button onPress={() => Linking.openURL(url)}>
                  Edit
                </Button>
                <Button onPress={() => Linking.openURL(url)}>
                  Delete
                </Button>
            </CardSection>
        </Card>
    );
};




const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    numberPlateStyle:{
        justifyContent: 'center',
        alignItems: 'center',

        width: 70
    },
    headerTextStyle: {
        fontSize: 18
    },
    thumbnailStyle: {
        height: 50,
        width: 50
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle: {
        height: 300,
        flex: 1,
        width: null
    },
    buttonStyle: {
        fontSize: 18

    }

};
export default AlbumDetail;
