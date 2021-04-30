/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 * @format
 */

import React from 'react';

// 导航配置
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
// 原生组件
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image
} from 'react-native';

// redux
import store from './src/reduxState/store';
import {Provider} from "react-redux";
import Routers from './src/routers/routers';
// 系统
import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// 样式定义
const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    WidthFull: {
        width: '100%',
    }
});
const {Navigator, Screen} = createStackNavigator()
// 唯一入口
const APP = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    return (
        <Provider store={store}>
            <Routers/>
        </Provider>
    )

}
export default APP;
