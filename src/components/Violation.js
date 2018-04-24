import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, TouchableOpacity, NativeModules } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';
import TabNavigator from 'react-native-tab-navigator';
import VDetail from './VDetail';
import {Actions} from 'react-native-router-flux';
import IDdetail from './IDdetail';
import IDdetail1 from './IDdetail1';
import BaseScreen from './BaseScreen';

// import { StackNavigator } from 'react-navigation';
// const { VDLViewManager } = NativeModules;
import VDLViewManager from '../../VDLNativeModuleNativeModule';


//2017-11-13T11:00:04+07:00
//2018-1-16T10:57:43.000+07:00
//2017-11-14T11:00:04+07:00

const day = new Date().getDate();
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();
const Hour = new Date().getHours();
const Minute = new Date().getMinutes();
const Second = new Date().getSeconds();

const currentDate = year + '-' + month + '-' + day
              + 'T' + Hour + ':' + Minute + ':' +
              Second + '+07:00';



class Violation extends Component {
  state = { albums: [ ], error: '' };



  async getToken() {
    try {
      let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
    if(!accessToken) {
      console.log("Token not set")
    }  else  {
      this.verifyToken(accessToken);
    }
    } catch (error) {
      console.log("something went wrong !!");

    }
  }

  async verifyToken(token) {
    let accessToken = token;

      try {
      // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
      let response = await fetch('https://ats-test.pineapplevisionsystems.com/users/sign_in', {
          method: 'POST',
          headers: { 'Accept': 'application/json',
              'Content-Type': 'application/json' },
          body: JSON.stringify({
            "user":  {
          "username": this.state.username,
          "password": this.state.password,
        }
          })
      });

      let res = await response.text();
      if(response.status >= 200 && response.status < 300) {
        // this.setState({error: ""});
        // let accessToken = res;
        // this.storeToken(accessToken);
        Actions.Vlist();
        console.log("res token: " + accessToken);
      } else {
        let errors = res;
        throw errors;
      }
    } catch(error) {
      console.log( "error" + error );
      }
    }

    componentWillMount() {
        axios.get(
          'https://ats-test.pineapplevisionsystems.com/json_violations/'+ this.props.Violation_id,

{
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
        })
            .then(response => this.setState({ albums: [response.data] }))
            .catch(error =>
              {error : error.data});
            this.getToken();

            console.log('http://localhost/test/'+ this.props.Violation_id + '.json');
             // VDLViewManager.emitter.remove();
    }


     renderAlbums() {
       return (

         this.state.albums.map(album =>
         <IDdetail1 key={album.id} album = {album} />
       ));
     }

    render() {
      console.log(this.state);
        return (
            <ScrollView>
                {this.renderAlbums()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

});

export default Violation;
