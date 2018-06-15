import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';
import TabNavigator from 'react-native-tab-navigator';
// import { StackNavigator } from 'react-navigation';





class AlbumList extends Component {
  state = { albums: [] };



    componentWillMount() {
        axios.get('http://kaunghtet912.kcnloveanime.com/ats_test/ats.json')
            .then(response => this.setState({ albums: response.data }));
    }


     renderAlbums() {
       return this.state.albums.map(album =>
         <AlbumDetail key={album.time} album = {album} />
       );
     }

    render() {
      console.log(this.state);
        return (
            <ScrollView>
                {this.renderAlbums()}
            </ScrollView>
        );
    }
}

export default AlbumList;
