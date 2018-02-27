import React from 'react';
import { View, ListView } from 'react-native';
import VideoPlayer from 'react-native-native-video-player';
const video = () => {

    return (

        <View>
        VideoPlayer.showVideoPlayer('https://ats-test.pineapplevisionsystems.com/system/videos/files/001/291/444/original/video.avi?1510547148')
        </View>

    );
};

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
};


export default video;
