import React, { Component } from 'react';
import { ActivityIndicator, ListView, Navigator, Text, View, StyleSheet, AsyncStorage, requireNativeComponent } from 'react-native';
import LoginForm from './src/components/LoginForm';
import Tab from './src/components/Tab';
import {Spinner, Header} from './src/components/common';
import API from './src/components/API';
import {Router, Scene, Route, TabBar, Schema, Actions} from 'react-native-router-flux';
import Authentication from './src/components/Authentication';
import HomePage from './src/components/HomePage';
import AlbumList from './src/components/AlbumList';
import Vlist from './src/components/Vlist';
import Violation from './src/components/Violation';
import VlistPage from './src/components/VlistPage';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignOut from './src/components/SignOut';
import CustomScreen from './src/components/CustomScreen';
import DeleteViolation from './src/components/DeleteViolation';
import VideoPlayer from './src/components/VideoPlayer';
import manual_ticket from './src/components/common/manual_ticket';
import manual_warning from './src/components/common/manual_warning';
import Ticketlist from './src/components/Ticketlist';


// const VDLView = requireNativeComponent('VDLView', null)
//
// export default class VDLViewView extends Component {
//   render () {
//     return <VDLView {...this.props} />
//   }
// }
//
// VDLViewView.propTypes = {
//   exampleProp: PropTypes.string
// }
// const { VDLView } = requireNativeComponent('VDLView', null);
import VDLViewNativeView from './VDLViewNativeView';
import PropTypes from 'prop-types';

class go extends Component {
  render() {
    return <VDLViewNativeView style={{ flex: 1 }} />;
  }
}





export default class App extends React.Component {


    constructor() {
        super();
        this.state = { hasToken: false, isLoaded: false };
    }

    componentWillMount() {
        AsyncStorage.getItem('id_token').then((token) => {
            this.setState({ hasToken: token !== null, isLoaded: true });
        });
    }

    //panHandlers={null}
    render() {
        if (!this.state.isLoaded) {
            return (
                <Spinner />
            );
        } else {
            return (
                <Router>
                    <Scene key="root"  hideNavBar panHandlers={null} >
                        <Scene
                            component={Authentication} hideNavBar={true}
                            initial={true} key='Authentication'
                            title='Authentication'

                        />


                        <Scene key="main" panHandlers={null}>
                            <Scene

                                component={HomePage}
                                key='HomePage'
                                title= 'Violations'
                                hideNavBar={true}
                            />
                            <Scene onRight={()=>Actions.SignOut()}
                                rightTitle="Sign Out" key="Violation"  component={Violation} title="Violation"  />

                            <Scene key="SignOut"  component={SignOut} title="SignOut"  />
                            <Scene key="CustomScreen"  component={CustomScreen} title="CustomScreen"  />
                            <Scene key="DeleteViolation"  component={DeleteViolation} title="DeleteViolation"  />
                            <Scene key="VideoPlayer"  component={VideoPlayer} title="VideoPlayer"  />
                            <Scene key="manual_ticket"  component={manual_ticket} title="Ticket"  />
                            <Scene key="manual_warning"  component={manual_warning} title="Warning"  />
                            <Scene key="Ticketlist"  component={Ticketlist} title="Ticketlist"  />
                            <Scene key="go"  component={go} title="go"  />
                        </Scene>
                    </Scene>
                </Router>






            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'baseline',
        justifyContent: 'center',
    },
});
