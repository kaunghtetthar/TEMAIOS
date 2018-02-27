// violation lists


import React, {Component} from 'react';
import { Text, View, Image,
  Linking, Dimensions,
  log, AsyncStorage, Alert,
  TouchableHighlight, Modal, ScrollView } from 'react-native';
import {Card, Button, CardSection, Spinner} from './common';
import TabNavigator from 'react-native-tab-navigator';
import {Actions} from 'react-native-router-flux';
import {Router, Scene} from 'react-native-router-flux';
import AlbumList from './AlbumList';
import PTRView from 'react-native-pull-to-refresh';
import Icon from 'react-native-vector-icons/FontAwesome';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';





const VDetail = ( {album} ) => {


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



    const { id,
        timestamp,
        date,
        thumbnail_image,
        plate_number,
        violation_type,
        evidence,
        brand,
        color,
        vehicle_type, plate_province } = album;

    const API_DATE = timestamp.slice(' ', 10);
    const API_TIME1 = timestamp.slice(11);
    const API_TIME = API_TIME1.slice('',11);


    const lego = violation_type.includes('RL');
    // To recogize the 'Violation_type'
    // String if RT show RT logo or SP show Speed logo
    //str.includes('To be');

    const mainurl = 'https://ats-test.pineapplevisionsystems.com';

    const [ group_en ] = evidence;

    const {url} = evidence[1];



    const state = { selectedTab: 'api' };

    const {
        thumbnailStyle,
        headerContentStyle,
        thumbnailContainerStyle,
        headerTextStyle,
        imageStyle,
        numberPlateStyle,
    } = styles;


    const Logo = () => {

        if (lego) {
            return require('./assets/RL_logo.png');
        } else {
            return require('./assets/SP_logo.jpg');
        }
    };

    const popup = () => {
        return (
          <View style={styles.container}>
  <PopupDialog
    dialogTitle={<DialogTitle title="Dialog Title" />}
  >
    <View>
      <modal />
    </View>
  </PopupDialog>
</View>
        );
    }

    const Slide = () => {
        return (
            <View style={styles.slide} >
                <Image style={styles.imageStyle} source={{uri: mainurl + url}} />
            </View>
        );
    }



    return (



      <Card onPress={() => Actions.Violation({ Violation_id: id } )}>
           <CardSection>


           <ScrollView style={styles.image} horizontal pagingEnabled={true}>

           <View style={thumbnailContainerStyle} horizontal>

           <CardSection>
               <Image
                   style={thumbnailStyle}
                   source={Logo()}
               />

               <Text>{API_DATE}{'\n'}{API_TIME}</Text>



               </CardSection>

               <Text style={{width : 130, height : 50}}>
               {brand} / {color} {'\n'} {vehicle_type}
               </Text>
               <Button onPress={() =>
                   Actions.Violation({ Violation_id: id } )
               }>
                   {plate_number}  {'\n'}
                   {plate_province}

               </Button>
           </View>

               <CardSection horizontal style={styles.image}>

                   <Card onPress={() => Actions.Violation({ Violation_id: id } )}>
                       <Slide/>
                   </Card>

                   <View horizontal>

                       <CardSection>

                           <Button onPress={() => Actions.manual_ticket({ id : id})}>
                               {'      '}
                               <Icon name="ticket" size={20} color="#666"/>
                               {'      '}
                           </Button>

                       </CardSection>

                       <CardSection>
                           <Button onPress={() => Actions.manual_warning({ id : id})}>
                               {'      '}
                               <Icon name="comment" size={20} color="#666"/>
                               {'      '}
                           </Button>
                       </CardSection>

                       <CardSection>
                           <Button onPress={() => Actions.DeleteViolation({ Violation_id: id } )}>
                               {'      '}
                               <Icon name="trash-o" size={20} color="#666"/>
                               {'      '}
                           </Button>
                       </CardSection>
                   </View>

               </CardSection>
           </ScrollView>


           </CardSection>






       </Card>


    );
};




const styles = {
  container: {
      flex: 1,
  },
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    numberPlateStyle:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTextStyle: {
        fontSize: 18
    },
    thumbnailStyle: {
        height: 40,
        width: 40
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle: {
        height: 130,
        flex: 1,
        width: null,
        alignSelf: 'stretch',
    },
    buttonStyle: {
        fontSize: 18

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    innerContainer: {
        alignItems: 'center',
    },
    slide: {
        flex: 1,
        // justifyContent: 'center',
        backgroundColor: 'transparent',
        width: 230
    },
    image: {

        flex: 1,
        width: 400
    },

};


export default VDetail;
