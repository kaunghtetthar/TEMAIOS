'use strict';
import React, {Component} from 'react';
import { Text, View, Image, Linking, Dimensions,
          log, AsyncStorage, Alert, TouchableHighlight, FlatList, NativeModules} from 'react-native';
import {Card, Button, CardSection, Spinner, CardScroll} from './common';
import TabNavigator from 'react-native-tab-navigator';
import {Actions} from 'react-native-router-flux';
import {Router, Scene} from 'react-native-router-flux';
import AlbumList from './AlbumList';
// import  Video  from 'react-native-video';

// import Tab from './Tab';
// import CustomScreen from './CustomScreen';
// import SimpleVideo from './SimpleVideo';
// import  {play}  from 'react-native-vlc-player';








import Swiper from 'react-native-swiper';

var VideoPlayer = require('react-native-native-video-player');


const TicketDetail = ( {album} ) => {

    const loading = require('./assets/RL_logo.png');

    const Slide = props => {
        return (
            <View style={styles.slide} >
                <Image style={styles.image} source={{uri: mainurl + props.uri}} />
            </View>
        );
    };


    //2017-11-13T11:00:04+07:00
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const Hour = new Date().getHours();
    const Minute = new Date().getMinutes();
    const Second = new Date().getSeconds();

    const currentDate = year + '-' + month + '-' + day
                  + 'T' + Hour + ':' + Minute + ':' +
                  Second + '+07:00';
    // const API_DATE = currentDate.slice(' ', 9);
    // const API_TIME = currentDate.slice(9);


    const { event_timestamp, ticket_at, law, location, status, evidence} = album;

    const { RNVideoPlayer } = NativeModules;

    const url = [evidence];

    // const API_DATE = event_timestamp.slice(' ', 10);
    // const API_TIME = event_timestamp.slice(11);


    // To recogize the 'Violation_type'
    // String if RT show RT logo or SP show Speed logo
    //str.includes('To be');

    const mainurl = 'https://ats-test.pineapplevisionsystems.com';


    // const { before_url } = evidence;
    // const  {url}  = evidence;

    // const lego = violation_type.includes('RL');
    // const Logo = () => {
    //
    //     if (lego) {
    //         return require('./RL_logo.png');
    //     } else {
    //         return require('./SP_logo.jpg');
    //     }
    // };

    // <View style={thumbnailContainerStyle}>
    //     <Image
    //         style={thumbnailStyle}
    //         source={Logo()}
    //     />
    // </View>


    const state = { selectedTab: 'api' };

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

                <View style={headerContentStyle}>
                    <Text style={headerTextStyle}>{event_timestamp}</Text>
                    <Text>{ticket_at}</Text>
                    <Text>{location} / {law} / {status}</Text>
                </View>


            </CardSection>


              <CardSection>

            <Swiper style={styles.wrapper} showsButtons>

                {
                    evidence.map((item, i) => <Slide
                        uri={item}
                        i={i}
                        key={i} />)
                }


            </Swiper>


            </CardSection>
        </Card>
    );
};

// <Video
//     style={imageStyle}
//     source={{ uri : mainurl + video_url }}
// />

// {
//     before_url.map((item, i) => <Slide
//         uri={item}
//         i={i}
//         key={i} />)
// }


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

    },

    wrapper: {
        height: 300,
    },

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    image: {

        flex: 1,
        backgroundColor: 'transparent'
    },
    controlBar: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    videoPlayer: { flex: 1 }


};
export default TicketDetail;
