import React from 'react'
import {Platform} from "react-native";
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderBackButton} from "@react-navigation/stack";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Iconfont} from "../../assets/font";

const {Navigator, Screen} = createStackNavigator();
const Tab = createBottomTabNavigator();
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import List from '../screens/List'
// tab导航配置
const RouteConfigs:any=({route})=>({
    tabBarIcon:({focused, color, size})=>{
        let iconName;
        if(route.name==='Home'){
            iconName=(focused?'TRP-Home':'TRP-seat')
        }else if(route.name==='List'){
            iconName=(focused?'TRP-Offer':'TRP-Brand')
        }
        return <Iconfont name={iconName} size={size} color={color}/>
    }
})
const HomeRouter = () => {
    return (
        <Tab.Navigator initialRouteName={'Home'} screenOptions={RouteConfigs}>
            <Tab.Screen name={'Home'} component={Home} options={{ tabBarBadge: 3 }}/>
            <Tab.Screen name={'List'} component={List} />
        </Tab.Navigator>
    )
}
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
    const headerTitleStyle: any = {
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1,
    }
    return (
        <NavigationContainer>
            <Navigator initialRouteName={'Home'}>
                <Screen name={'Home'} component={HomeRouter} options={{title: 'Home', headerStyle, headerTitleStyle}}
                        initialParams={{itemId: 42}}/>
                <Screen name={'Detail'} component={Detail} options={{
                    title: 'Detail', headerStyle, headerTitleStyle, headerLeft: (props) => {
                        // console.warn(props)
                        // 隐藏label
                        props.labelVisible = false;
                        return <HeaderBackButton {...props}/>
                    }
                }}/>
            </Navigator>
        </NavigationContainer>
    )
}
export default routers
