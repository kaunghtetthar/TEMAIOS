// Import library for making a component
import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions, View, Text, AsyncStorage } from 'react-native';
import LoginForm from './LoginForm';
import AlbumList from './AlbumList';
import VlistPage from './VlistPage';
import Vlist from './Vlist';
import {Actions} from 'react-native-router-flux';
import { Button, Card, CardSection, Input, Spinner } from './common';
import StackNav from './StackNav';



const ACCESS_TOKEN  =  'access_token';


export default class DeleteViolation extends Component {

  constructor() {
      super();
      this.state = { accessToken: "" , isLoaded: false };
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
      });

      let res = await response.text();
      if(response.status >= 200 && response.status < 300) {
        // this.setState({error: ""});
        // let accessToken = res;
        // this.storeToken(accessToken);
        console.log("res token: " + accessToken);
        console.log("Violation_id :" + this.props.Violation_id );
      } else {
        let errors = res;
        throw errors;
      }
    } catch(error) {
      console.log( "error" + error );
      }
    }

  async Delete() {

      try {
      // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
      let response = await fetch('https://ats-test.pineapplevisionsystems.com/devices/' + this.props.Violation_id, {
          method: 'DELETE',
          headers: { 'Accept': 'application/json',
              'Content-Type': 'application/json' },
          body: JSON.stringify({
            "device": {
                "token": "testtoken"
      }
          })
      });

      let res = await response.text();
      if(response.status >= 200 && response.status < 300) {
        // this.setState({error: ""});
        // let accessToken = res;
        // this.storeToken(accessToken);
        Actions.Vlist();

        console.log("success login" + res);
      } else {
        let errors = res;
        throw errors;
      }
    } catch(error) {
      console.log( "error" + error );
      }
  }

  async deleteToken() {
  try {
    await AsyncStorage.removeItem(ACCESS_TOKEN);
    Actions.Authentication();
  } catch (error) {
    console.log("SomeThing went wrong");
  }
  }


    render() {
        return (
                <Card>
                <CardSection>

                <Button onPress={this.Delete.bind(this)}>
                Delete Violation
                </Button>

                </CardSection>
                </Card>
        );
    }
}


class SignOut extends Component {

    state = { selectedTab: 'home' };



    render() {
    return (

                <View style={styles.container}>
                 <Profile />
                 </View>



    );
}
}



const styles = {
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5
    },
    container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  innerContainer: {
    alignItems: 'center',
  },
};
