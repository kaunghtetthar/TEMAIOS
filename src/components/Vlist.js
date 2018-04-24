import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';
import TabNavigator from 'react-native-tab-navigator';
import VDetail from './VDetail';
import {Actions} from 'react-native-router-flux';
import PTRView from 'react-native-pull-to-refresh';
import Tab from './Tab';

// import { StackNavigator } from 'react-navigation';


//2017-11-13T11:00:04+07:00
//2018-1-16T10:57:43.000+07:00
//2017-11-14T11:00:04+07:00

const day = new Date().getDate();
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();
const Hour = new Date().getHours();
const Minute = new Date().getMinutes();
const Second = new Date().getSeconds();

const currentDate = year + '-' + month + '-' + day;



class Vlist extends Component {
  constructor(param) {
    super(param);
    this._refresh = this._refresh.bind(this);
    this.delete = this._handleDelete.bind(this);
    delete_id = this.props.delete_id;
  }
  state = { albums: [] };

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
        Actions.HomePage();
        console.log("res token: " + accessToken);
      } else {
        let errors = res;
        throw errors;
      }
    } catch(error) {
      console.log( "error" + error );
      }
    }

    //2017-11-13T11:00:04+07:00

    componentWillMount() {
        axios.get(
          'https://ats-test.pineapplevisionsystems.com/json_violations?after=2018-03-19T08:00:04+07:00' ,
{
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
        })
            .then(response => this.setState({ albums: response.data }))
            .catch(error => {console.log(error.response)});
            this.getToken();
            console.log('https://ats-test.pineapplevisionsystems.com/json_violations?after=' + currentDate);
    }

    _handleDelete(delete_id){
      this.setState(prevState => ({
          albums: prevState.albums.filter(album => album != delete_id )
      }));
}

     renderAlbums() {
        if (this.props.delete_id != null) {
            this._handleDelete(this.props.delete_id);
          return (
            this.state.albums.map(album =>
            <VDetail key={album.id} album = {album}/>
          ));
        } else {
          return (
            this.state.albums.map(album =>
            <VDetail key={album.id} album = {album} props = {this.props.navigation} />
          ));
        }

     }


     _refresh() {
       return new Promise((resolve) => {
         setTimeout(()=>{

           axios.get(
             'https://ats-test.pineapplevisionsystems.com/json_violations?after=' + currentDate ,
   {
               headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
               }
           })
               .then(response => this.setState({ albums: response.data }));
               this.getToken();

           resolve();
         }, 2000)
       });
  }

    render() {
      console.log(this.state);
        return (
            <PTRView onRefresh={this._refresh} >
            <ScrollView>
                {this.renderAlbums()}
            </ScrollView>

            </PTRView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Vlist;
