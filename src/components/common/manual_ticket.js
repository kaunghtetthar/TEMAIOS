import React, { Component } from 'react';
import { Text, View, Modal, StyleSheet } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Card, Button, CardSection, Spinner, CardScroll, Input} from './';

export default class manual_ticket extends Component {
  state = {
    modalVisible: true,
  };

  constructor() {
      super();
      this.state = { ticket_number: null, book_number: null, isLoading: false, error: ""};

  }

  openModal() {
    this.setState({modalVisible:true});
  }

  closeModal() {
    this.setState({modalVisible:false});
  }

  async makeTicket() {

      try {
      // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
      let response = await fetch('https://ats-test.pineapplevisionsystems.com/manual_ticket', {
          method: 'POST',
          headers: { 'Accept': 'application/json',
              'Content-Type': 'application/json' },
          body: JSON.stringify({
             "violation" : {
                    "id" : this.props.id,
                    "manual_ticket_number" : this.state.ticket_number,
                    "manual_book_number" : this.state.book_number
  }
          })
      });

      let res = await response.text();
      if(response.status >= 200 && response.status < 300) {
        this.setState({error: ""});
        let accessToken = res;
        this.storeToken(accessToken);
        Actions.HomePage();
        console.log("res token: " + accessToken);
      } else {
        let errors = res;
        throw errors;
      }
    } catch(error) {
      this.removeToken();
      this.setState({error: error});
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


  render() {
    return (
        <View style={styles.container}>
                <Text>{this.props.id}</Text>
                <Card>


                      <CardSection>
                          <Input
                              placeholder="...."
                              label="Ticket_number"
                              value={this.state.ticket_number}
                              onChangeText={username => this.setState({ username })}
                          />
                      </CardSection>


                      <CardSection>
                          <Input
                              secureTextEntry
                              placeholder="...."
                              label="Book_number"
                              value={this.state.book_number}
                              onChangeText={password => this.setState({ password })}
                          />
                      </CardSection>


                      <CardSection>
                      <Button onPress={() => Actions.HomePage() && this.makeTicket.bind(this) }>
                      Done
                      </Button>
                      </CardSection>

                      <Text style={StyleSheet.errorTextStyle}>
                          {this.state.error}
                      </Text>

                  </Card>


        </View>
    );
  }
}

const styles = StyleSheet.create({
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
});
