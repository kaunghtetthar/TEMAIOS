// app/routes/Authentication.js

import React, {Component} from 'react';
import { Alert, StyleSheet, AsyncStorage, Text, TextInput, TouchableOpacity, View, ListView, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { Button, Card, CardSection, Input, Spinner } from './common';
import AlbumList from './AlbumList';
import axios from 'axios';
import Tab from './Tab';


const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });
const scaleAnimation = new ScaleAnimation();
const fadeAnimation = new FadeAnimation({ animationDuration: 150 });
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
  FadeAnimation,
} from 'react-native-popup-dialog';


const ACCESS_TOKEN = 'access_token';


class Authentication extends Component {

    //   async saveItem(item, selectedValue) {
    //   try {
    //     await AsyncStorage.setItem(item, selectedValue);
    //   } catch (error) {
    //     console.error('AsyncStorage error: ' + error.message);
    //   }
    // }



    constructor() {
        super();
        this.state = { username: null, password: null, isLoading: false, error: ""};

    }



    showScaleAnimationDialog = () => {
   this.scaleAnimationDialog.show();
 }



    async storeToken(accessToken) {
      try {
        await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
        this.getToken();
      } catch (error) {
        console.log("something went wrong  !!");
      }
    }

    async getToken() {
      try {
        let token = await AsyncStorage.getItem(ACCESS_TOKEN);
        console.log("token is " + token);
      } catch (error) {
        console.log("something went wrong  !!")
      }
    }

    async removeToken() {
      try {
        await AsyncStorage.removeItem(ACCESS_TOKEN);
        this.getToken();
      } catch (error) {
        console.log("something went wrong  !!")
      }
    }


    componentWillMount() {
        this.getToken();
    }

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
          Actions.Tab();
          console.log("res token: " + accessToken);
        } else {
          let errors = res;
          throw errors;
        }
      } catch(error) {
        console.log( "error" + error );
        }
      }




    async userLogin() {

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
          this.setState({error: ""});
          let accessToken = res;
          this.storeToken(accessToken);
          Actions.Tab();

          console.log("res token: " + accessToken);
        } else {
          let errors1 = res;
          errors2 = errors1.slice(9)
          errors = errors2.replace( '}', ' ')
          throw errors.replace( /["']/g, ' ');
        }
      } catch(error) {
        this.removeToken();
        this.setState({error : error});
        this.showScaleAnimationDialog();
        console.log( "error" + error );
        }
      }
            // .then((response) => response.json())
            // .then((responseData) => {
            //   let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            //   this.setState({
            //       isLoading: true,
            //       dataSource: ds.cloneWithRows(responseData.user),
            //   }, function() {
            //      this.Album();
            //   });
            // })
            // .catch((error) => {
            //     console.error(error);
            // });



  Album() {
      if(this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(username) => <Text>{username}</Text>}
            />
            <Tab />
        </View>
      );
    }
  }


    render() {
        return (
            <View style={{flex : 1}}>
             <View style={styles.container}>

            <CardSection>
                <Image
                    style={{width: 350, height: 100}}
                    source={require('./assets/logo.png')}
                />
            </CardSection>

                <CardSection>
                    <Input
                        placeholder="username"
                        label="Username"
                        value={this.state.username}
                        onChangeText={username => this.setState({ username })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        placeholder="password"
                        label="Password"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>

                <CardSection>
                    <Button onPress={this.userLogin.bind(this)}>
                    Log In
                    </Button>

                </CardSection>

                <PopupDialog
                   ref={(popupDialog) => {
                     this.scaleAnimationDialog = popupDialog;
                   }}
                   dialogAnimation={scaleAnimation}
                   // dialogTitle={<DialogTitle title="Error" />}
                   actions={[
                     <DialogButton
                       text="DISMISS"
                       onPress={() => {
                         this.scaleAnimationDialog.dismiss();
                       }}
                       key="button-1"
                     />,
                   ]}
                 >
                 <View style={styles.dialogContentView}>
                 <Text style={StyleSheet.errorTextStyle}>
                     {this.state.error}
                 </Text>
                 </View>
               </PopupDialog>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6fff5',
    },
    dialogContentView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    imageStyle: {
        height: 300,
        flex: 1,
        width: null
    },
});

export default Authentication;
