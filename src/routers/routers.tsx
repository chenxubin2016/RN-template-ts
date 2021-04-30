import React from 'react'
import {Platform} from "react-native";
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";

const {Navigator, Screen} = createStackNavigator();
import Home from '../screens/Home';
import Detail from '../screens/Detail';

const routers = () => {
    // 去掉导航header 投影
    const headerStyle = (() => {
        if (Platform.OS === 'ios') {
            return {
                borderBottomWidth: 0,
                borderBottomColor: "red",
                shadowOffset: {
                    width: 0, //阴影X轴位移
                    height: 0 //阴影Y轴位移
                },
                shadowColor: 'green',//阴影颜色
                shadowRadius: 0, //阴影模糊半径
                shadowOpacity: 0.2, // 阴影不透明度
            }
        } else {
            return {
                borderBottomWidth: 0,
                elevation: 0,
            }
        }
    })()
    // title居中显示
    const headerTitleStyle:any = {
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1,
    }
    return (
        <NavigationContainer>
            <Navigator initialRouteName={'Home'}>
                <Screen name={'Home'} component={Home} options={{title: 'Home', headerStyle, headerTitleStyle}}/>
                <Screen name={'Detail'} component={Detail} options={{title: 'Detail', headerStyle, headerTitleStyle}}/>
            </Navigator>
        </NavigationContainer>
    )
}
export default routers
