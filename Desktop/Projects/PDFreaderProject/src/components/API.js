import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, StyleSheet } from 'react-native';
import LoginForm from './LoginForm';
import Tab from './Tab';

export default class API extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    componentDidMount() {
        return fetch('https://ats-test.pineapplevisionsystems.com/users/sign_in', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: {
                    username: 'policeAll',
                    password: 'admin12345' }
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    isLoading: true,
                    dataSource: ds.cloneWithRows(responseJson.user),
                }, function() {
                // do something with new state
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
