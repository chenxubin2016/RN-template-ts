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
    StyleSheet,
    Dimensions
} from 'react-native'
import {Iconfont} from "../../assets/font";
import {Colors} from "react-native/Libraries/NewAppScreen";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles: any = StyleSheet.create({
    containerWidth: {
        width: windowWidth,
        height: windowHeight
    }
})
const Home = ({route, navigation}) => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const linkTo = (target: String) => navigation.navigate(target, {
        id: 1000,
        otherParams: 'anything you want here'
    });
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
            <ScrollView>
                <View>
                    <Text style={{textAlign: 'center'}}>list</Text>
                    <Image source={require('../../assets/img/MV.jpeg')} style={styles.containerWidth}
                           resizeMode={'cover'}/>
                    <Iconfont name={'TRP-Star'} size={54} color={'#9feb42'}/>
                    <Button title={'查看详情'} onPress={() => {
                        linkTo('Detail')
                    }}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};
export default Home
