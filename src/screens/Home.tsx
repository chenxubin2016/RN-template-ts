import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    Image,
    StatusBar,
    useColorScheme,
    Button,
} from 'react-native'
import {Colors} from "react-native/Libraries/NewAppScreen";
const Home = ({navigation}) => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const linkTo=(target:String)=>navigation.navigate(target);
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={'#fff'}/>
            <ScrollView>
                <View>
                    <Text style={{textAlign: 'center'}}></Text>
                    <Image source={require('../../assets/img/es6.jpeg')}/>
                    <Button title={'学习去'} onPress={()=>{linkTo('Detail')}}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};
export default Home
