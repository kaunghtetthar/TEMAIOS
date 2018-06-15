import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, StyleSheet } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import {Actions} from 'react-native-router-flux';


import Tab from './Tab';

class LoginForm extends Component {
  state = { email: '', password:'', error: '', loading: false };



  constructor(props) {
      super(props);
      this.state = {
          isLoading: true
      };
  }

  sign_in() {
    if (!this.state.email || !this.state.password) return;
    fetch('https://ats-test.pineapplevisionsystems.com/users/sign_in', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
             'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                username: this.state.email,
                password: this.state.password,
        }),
    })
        .then((response) => response.json())
        .then((responseJson) => {
          this.saveItem('id_token', responseJson.id_token),
          Alert.alert('Login Success', '!!!' ),
          Actions.HomePage();
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                isLoading: false,
                dataSource: ds.cloneWithRows(responseJson.user),
            }, function() {
            // do something with new state
            });
        })
        .catch((error) => {
            console.error(error);
        });
  }

  sign_out() {
    return fetch('https://ats-test.pineapplevisionsystems.com/users/sign_out')
        .catch((error) => {
            console.error(error);
        });
  }

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true});


    return fetch('https://ats-test.pineapplevisionsystems.com/users/sign_in', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
             'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                username: 'police',
                password: 'admin12345'
        }),
    })
        .then((response) => response.json())
        .then((responseJson) => {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                isLoading: false,
                dataSource: ds.cloneWithRows(responseJson.user),
            }, function() {
            // do something with new state
            });
        })
        .catch((error) => {
            console.error(error);
        });
  }



  onLoginFail() {
    this.setState({ error: 'Authentication Failed', loading: false });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: true,
      error: ''
    });
  }

  rendersignout() {
  //   if (this.state.loading) {
  //   return <Spinner size="small" />;
  // }

  return (
    <Button onPress={this.sign_out.bind(this)}>
    Log Out
    </Button>
  );
  }

  renderButton() {


  return (
    <Button onPress={this.onButtonPress.bind(this)}>
    Log In
    </Button>
  );
  }

  renderButtonSignOut() {
    if (this.state.loading) {
    // return <Spinner size="small" />;
  }

  return (
    <Button onPress={this.rendersignout.bind(this)}>
    Log Out
    </Button>
  );
  }

  renderAPI() {
    if (this.state.isLoading) {
        return (
            <View>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <View>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(username) => <Text>{username}</Text>}
            />

        </View>
    );
}

  render() {
    return (
      <Card>
        <CardSection>
          <Input
          placeholder="username"
          label="user"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
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

        <Text style={StyleSheet.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}

        </CardSection>

        <CardSection>
          {this.rendersignout()}

        </CardSection>

        {this.renderAPI()}

      </Card>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    errorTextStyle: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'red'
    }
});


export default LoginForm;
