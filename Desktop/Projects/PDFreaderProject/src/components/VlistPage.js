import React, {Component} from 'react';
import { View, TouchableHighlight , StyleSheet, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Router, Scene} from 'react-native-router-flux';
import Violation from './Violation';
import Tab from './Tab';
import Vlist from './Vlist';
import Spinner from './common';
import AlbumList from './AlbumList';

class VlistPage extends Component {


    render() {
        return (

            <Router>
                <Scene key='root'>
                    <Scene
                        component={Vlist}
                        hideNavBar={true}
                        initial={true}
                        key='Vlist'
                        title='Vlist'
                    />
                    <Scene
                        component={Vlist}
                        hideNavBar={true}
                        key='Vlist'
                        title='Vlist'
                    />
                </Scene>
            </Router>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'baseline',
        // justifyContent: 'center',
    },
});

export default VlistPage;
