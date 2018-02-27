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
import { Button, Card, CardSection, Input, Spinner} from './common';
import StackNav from './StackNav';
import FindViolation from './FindViolation';
import FindTicket from './FindTicket';


const ACCESS_TOKEN  =  'access_token';

const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
    return ( px *  deviceW / basePx );
}

class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Vlist />
            </View>
        );
    }
}


class Find extends Component {
    render() {
        return (
            <View style={styles.container}>
                <FindViolation />
            </View>
        );
    }
}

class Ticket extends Component {
    render() {
        return (
            <View style={styles.container}>
                <FindTicket />
            </View>
        );
    }
}

class Violation extends Component {
    render() {
        return (
            <View style={styles.container}>
                <modal />
            </View>
        );
    }
}

class Profile extends Component {

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

  async onLogout() {

      try {
      // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
      let response = await fetch('https://ats-test.pineapplevisionsystems.com/users/sign_out', {
          method: 'DELETE',
      });

      let res = await response.text();
      if(response.status >= 200 && response.status < 300) {
        // this.setState({error: ""});
        // let accessToken = res;
        // this.storeToken(accessToken);
        Actions.Authentication();
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

                <Button onPress={this.onLogout.bind(this)}>
                Sign out
                </Button>

                </CardSection>
                </Card>
        );
    }
}


class Tab extends Component {

    state = { selectedTab: 'home' };



    render() {
    return (
        <TabNavigator style={styles.container}>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'home'}
                title="Home"
                selectedTitleStyle={{color: '#3496f0' }}
                renderIcon={() => <Icon name="home" size={px2dp(22)} color="#666"/>}
                renderSelectedIcon={() => <Icon name="home" size={px2dp(22)} color="#3496f0"/>}
                badgeText="1"
                onPress={() => this.setState({selectedTab: 'home'})}>
                 <Home />
            </TabNavigator.Item>

            <TabNavigator.Item
                selected={this.state.selectedTab === 'searchViolation'}
                title="Violation"
                selectedTitleStyle={{color: '#3496f0'}}
                renderIcon={() => <Icon name="search" size={px2dp(22)} color="#666"/>}
                renderSelectedIcon={() => <Icon name="search" size={px2dp(22)} color="#3496f0"/>}
                onPress={() => this.setState({selectedTab: 'searchViolation'})}>
                 <Find />
            </TabNavigator.Item>

            <TabNavigator.Item
                selected={this.state.selectedTab === 'searchTicket'}
                title="Ticket"
                selectedTitleStyle={{color: '#3496f0'}}
                renderIcon={() => <Icon name="search-plus" size={px2dp(22)} color="#666"/>}
                renderSelectedIcon={() => <Icon name="search-plus" size={px2dp(22)} color="#3496f0"/>}
                onPress={() => this.setState({selectedTab: 'searchTicket'})}>
                 <Ticket />
            </TabNavigator.Item>

            <TabNavigator.Item
                selected={this.state.selectedTab === 'profile'}
                title="Sign Out"
                selectedTitleStyle={{color: '#3496f0'}}
                renderIcon={() => <Icon name="user" size={px2dp(22)} color="#666"/>}
                renderSelectedIcon={() => <Icon name="user" size={px2dp(22)} color="#3496f0"/>}
                onPress={() => this.setState({selectedTab: 'profile'})}>
                 <Profile />
            </TabNavigator.Item>




        </TabNavigator>
    );
}
}

// <TabNavigator.Item
//     selected={this.state.selectedTab === 'api'}
//     title="API"
//     selectedTitleStyle={{color: '#3496f0'}}
//     renderIcon={() => <Icon name="home" size={px2dp(22)} color="#666"/>}
//     renderSelectedIcon={() => <Icon name="home" size={px2dp(22)} color="#3496f0"/>}
//     onPress={() => this.setState({selectedTab: 'api'})}>
//      <API />
// </TabNavigator.Item>


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
    }
};

export default Tab;
