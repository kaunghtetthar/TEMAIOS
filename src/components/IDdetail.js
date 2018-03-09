'use strict';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Text, View, Image, Linking, Dimensions, ImageBackground, TouchableOpacity, ScrollView,
          log, AsyncStorage, Alert, TouchableHighlight, FlatList, NativeModules} from 'react-native';
import {Card, Button, CardSection, Spinner, CardScroll} from './common';
import TabNavigator from 'react-native-tab-navigator';
import {Actions} from 'react-native-router-flux';
import {Router, Scene} from 'react-native-router-flux';
import AlbumList from './AlbumList';
// import  Video  from 'react-native-video';
//
// import Tab from './Tab';
// import CustomScreen from './CustomScreen';
// import SimpleVideo from './SimpleVideo';
// import  {play}  from 'react-native-vlc-player';



const {VDLViewManager} = NativeModules




import Swiper from 'react-native-swiper';


const IDdetail = ( {album} ) => {

    const loading = require('./assets/RL_logo.png');

    const Slide = props => {
        return (
            <View style={styles.slide} >
                <Image style={styles.image} source={{uri: mainurl + props.uri}} />
            </View>
        );
    }

    const Slide1 = props => {
        return (
            <Card>
            <View style={styles.slide} >
                <Image style={styles.image} source={{uri: mainurl + props.uri}} />
            </View>
            </Card>
        );
    }


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


    const { id, timestamp, date,
        plate_number,evidence, brand, color,
        vehicle_type, violation_type, plate_province} = album;

    const { RNVideoPlayer } = NativeModules;

    const API_DATE = timestamp.slice(' ', 10);
    const API_TIME = timestamp.slice(11);


    // To recogize the 'Violation_type'
    // String if RT show RT logo or SP show Speed logo
    //str.includes('To be');

    const mainurl = 'https://ats-test.pineapplevisionsystems.com';

    // const { before_url } = evidence;

    const before_url = evidence[0].url;
    const  after_url  = evidence[1].url;
    const license_url  = evidence[2].url;
    const  {url}  = evidence[3];

    const lego = violation_type.includes('RL');
    const Logo = () => {

        if (lego) {
            return require('./assets/RL_logo.png');
        } else {
            return require('./assets/SP_logo.jpg');
        }
    };


    const state = { selectedTab: 'api' };

    const {
        thumbnailStyle,
        headerContentStyle,
        thumbnailContainerStyle,
        headerTextStyle,
        imageStyle,
        numberPlateStyle,
        errorTextStyle,
    } = styles;


    return (

        <Card>
            <CardSection>
                <View style={thumbnailContainerStyle}>
                    <Image
                        style={thumbnailStyle}
                        source={Logo()}
                    />
                </View>
                <View style={headerContentStyle}>
                    <Text style={headerTextStyle}>{API_DATE}</Text>
                    <Text>{API_TIME}</Text>
                    <Text>{brand} / {color} / {vehicle_type}</Text>
                </View>
                <View style={numberPlateStyle}>
                    <Button onPress={() =>
                        this.Violation.bind(this)
                    }>
                        {plate_number} {'  '}
                        {plate_province}

                    </Button>
                </View>

            </CardSection>



            <Card>
            <View style={{backgroundColor: '#53a6e1', flex: 0.3}}>
            <Text style={{textAlign: 'center'}}> before violation </Text>
            </View>
            <Swiper style={styles.wrapper} horizontal showsButtons >

                {
                    before_url.map((item, i) => <Slide
                        uri={item}
                        i={i}
                        key={i} />)
                }


            </Swiper>
            </Card>

            <ScrollView style={styles.image} horizontal pagingEnabled={true}>
                <CardSection horizontal style={styles.image}>


                    {
                        before_url.map((item, i) => <Slide1
                            uri={item}
                            i={i}
                            key={i} />)
                    }





                </CardSection>
            </ScrollView>

            <View style={{backgroundColor: '#53a6e1', flex: 0.3}}>
            <Text style={{textAlign: 'center'}}> after violation </Text>
            </View>
            <Swiper style={styles.wrapper} showsButtons>

                {
                    after_url.map((item, i) => <Slide
                        uri={item}
                        i={i}
                        key={i} />)
                }


            </Swiper>


            <Card>
            <View style={{backgroundColor: '#53a6e1', flex: 0.3}}>
            <Text style={{textAlign: 'center'}}> license </Text>
            </View>
            <Swiper style={styles.wrapper} showsButtons>

                {
                    license_url.map((item, i) => <Slide
                        uri={item}
                        i={i}
                        key={i} />)
                }


            </Swiper>
            </Card>



            <Card>

            <View style={{backgroundColor: '#53a6e1', flex: 0.3}}>
            <Text style={{textAlign: 'center'}}> Violation Video </Text>
            </View>
            <ImageBackground
                style={styles.wrapper}
                source={{uri: mainurl + after_url[0]}}
            >

            <TouchableOpacity
              style={styles.playbutton}
            onPress={() => VDLViewManager.gopagetwo(mainurl + url)}>
            <Image

            source={require('./assets/play.png')}>

            </Image>
            </TouchableOpacity>

            </ImageBackground>





            </Card>
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

    playbutton: {
    alignItems: 'center',
    padding: 130
  },

    slide: {
        // flex: 1,
        justifyContent: 'center',
        // // alignItems: 'center',
        // backgroundColor: 'transparent'
        flex: 1,
        // justifyContent: 'center',
        backgroundColor: 'transparent',
        width: 390,
        height: 300,
    },
    image: {

        flex: 1,
        // backgroundColor: 'transparent'
    },
    controlBar: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    videoPlayer: { flex: 1 },

    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },


};
export default IDdetail;
