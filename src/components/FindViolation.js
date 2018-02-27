import React, { Component } from 'react';
import { Text, View, Modal, StyleSheet } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Card, Button, CardSection, Spinner, CardScroll, Input} from './common';


export default class FindViolation extends Component {
    constructor() {
        super();
        this.state = { id: null, modalVisible: true, isLoading: false, error: ""};

    }

    async search() {

        try {
        // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
        let response = await fetch('https://ats-test.pineapplevisionsystems.com/json_violations/'+ this.state.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' ,
              },
        });

        let res = await response.text();
        if(response.status >= 200 && response.status < 300) {
          this.setState({error: ""});
          Actions.Violation({Violation_id: this.state.id});
        } else {
          let errors = res;
          throw errors;
        }
      } catch(error) {
        this.setState({error: error});
        console.log( "error" + error );
        }
      }


    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.Text}</Text>
                <Card>


                    <CardSection>
                        <Input
                            placeholder="...."
                            label="Violation_id"
                            value={this.state.id}
                            onChangeText={id => this.setState({ id })}
                        />
                    </CardSection>

                    <CardSection>
                        <Button onPress={this.search.bind(this)}>
                        Search
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
