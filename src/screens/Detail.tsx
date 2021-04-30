import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    Image,
    StatusBar,
    useColorScheme
} from 'react-native'
import {Colors} from "react-native/Libraries/NewAppScreen";

const Home = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
            <ScrollView>
                <View>
                    <Text style={{textAlign: 'center'}}>详情</Text>
                    <Image source={require('../../assets/img/MV.jpeg')}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};
export default Home
