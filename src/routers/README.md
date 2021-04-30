# 导航器使用规则
[文档地址](https://reactnavigation.org/docs/getting-started)

## 安装

```
yarn add @react-navigation / native 
yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
// ios 需要执行一下命令
npx pod-install ios
```
## 使用
```jsx harmony
入口处添加
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    // 顶层使用NavigationContainer包裹
    <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
  );
}
```
## stack-nativgation 使用
```jsx harmony
// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
```
## 多页面配置

```jsx harmony
function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```
## 配置页面参数

```jsx harmony
<Stack.Screen
     name="Home"
     component={HomeScreen}
     options={{ title: 'Overview' }}
   />
```
## 额外参数传递

```jsx harmony
<Stack.Screen name="Home">
  {props => <HomeScreen {...props} extraData={someData} />}
</Stack.Screen>
```
## 页面路由跳转

```jsx harmony
import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

```
```jsx harmony
function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
    </View>
  );
}
```
>**navigation.navigate与navigation.push的区别**
navigation.navigate优先跳转栈内存在的路由，找不到时添加路由
navigation.push直接添加路由

## 页面路由返回

```jsx harmony
function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
              title="Go back to first screen in stack"
              onPress={() => navigation.popToTop()}
            />
    </View>
  );
}
```
>navigation.popToTop() 返回第一个路由，
navigation.goBack()返回上一层路由，
navigation.navigate('Home')返回指定路由

## 导航跳转参数传递与接收
```jsx harmony
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  /* 2. Get the param */
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
```
## 初始化导航传递参数

```jsx harmony
<Stack.Screen
  name="Details"
  component={DetailsScreen}
  initialParams={{ itemId: 42 }}
/>
```
## 子页面返回时向父页面传递参数及父页面参数接收

```jsx harmony
function HomeScreen({ navigation, route }) {
  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Create post"
        onPress={() => navigation.navigate('CreatePost')}
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
    </View>
  );
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: 'Home',
            params: { post: postText },
            merge: true,
          });
        }}
      />
    </>
  );
}
```
## 嵌套路由传递参数

```jsx harmony
navigation.navigate('Account', {
  screen: 'Settings',
  params: { user: 'jane' },
});
```
>向Account》Settings传递参数
>**参数传递尽量以简洁为主，避免多层嵌套**

## 导航标题设置

```jsx harmony
function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'My home' }}
      />
      <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
    </Stack.Navigator>
  );
}
```
## 动态设置导航标题

```jsx harmony
<Button
  title="Update the title"
  onPress={() => navigation.setOptions({ title: 'Updated!' })}
/>
```
## 标题样式设置-页面标题

```jsx harmony
function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'My home',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}
```
## 全局标题样式设置

```jsx harmony
function StackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'My home' }}
      />
    </Stack.Navigator>
  );
}
```

## 自定义标题组件

```jsx
function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('@expo/snack-static/react-native-logo.png')}
    />
  );
}

function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: props => <LogoTitle {...props} /> }}
      />
    </Stack.Navigator>
  );
}
```

## 标题按钮设置

```jsx
function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: props => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#fff"
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
```

## 具体页面内设置标题按钮

```jsx
function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          headerTitle: props => <LogoTitle {...props} />,
        })}
      />
    </Stack.Navigator>
  );
}

function HomeScreen({ navigation }) {
  const [count, setCount] = React.useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount(c => c + 1)} title="Update count" />
      ),
    });
  }, [navigation]);

  return <Text>Count: {count}</Text>;
}
```

## 自定义后退按钮

后退按钮是完全可定制的`headerLeft`，但如果你只是想改变标题或图片，还有其他`options`为- ，和。 headerBackTitle``headerTruncatedBackTitle``headerBackImage



## 嵌套导航器

```jsx
function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Messages" component={Messages} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### 每个导航器保留自己的导航历史记录

例如，当您在嵌套堆栈导航器的屏幕内按返回按钮时，即使有另一个导航器作为父级，它也会返回嵌套堆栈内的上一个屏幕。

### 每个导航器都有其自己的选项

例如，`title`在子导航器中嵌套的屏幕中指定选项不会影响父导航器中显示的标题。

如果要实现此行为，请参阅有关[带有嵌套导航](https://reactnavigation.org/docs/screen-options-resolution#setting-parent-screen-options-based-on-child-navigators-state)器的[屏幕选项](https://reactnavigation.org/docs/screen-options-resolution#setting-parent-screen-options-based-on-child-navigators-state)的指南。如果您要在堆栈导航器中呈现一个标签导航器，并且想要在堆栈导航器的标题中的标签导航器中显示活动屏幕的标题，这可能会很有用。

### 在导航每个屏幕都有自己的PARAMS [＃](https://reactnavigation.org/docs/nesting-navigators#each-screen-in-a-navigator-has-its-own-params)

例如，`params`传递给嵌套导航器中的屏幕的任何内容都在该`route`屏幕的属性中，并且不能从父或子导航器中的屏幕访问。

如果您需要从子屏幕访问父屏幕的参数，则可以使用[React Context](https://reactjs.org/docs/context.html)将参数公开给子屏幕。

### 导航操作由当前的导航器处理，如果无法处理，则会冒泡[＃](https://reactnavigation.org/docs/nesting-navigators#navigation-actions-are-handled-by-current-navigator-and-bubble-up-if-couldnt-be-handled)

例如，如果您`navigation.goBack()`在嵌套屏幕中进行调用，则只有当您已经在导航器的第一个屏幕上时，它才会在父导航器中返回。其他操作，例如`navigate`工作类似，即导航将在嵌套导航器中进行，如果嵌套导航器无法处理它，则父导航器将尝试处理它。在上面的示例中，`navigate('Messages')`在`Feed`屏幕内部调用时，嵌套的标签导航器将处理它，但是如果您调用`navigate('Settings')`，父堆栈导航器将处理它。

### 嵌套导航 父级调用子级方法

```jsx
navigation.dispatch(DrawerActions.toggleDrawer());
```

### 嵌套导航 子级监听父级事件

```jsx
const unsubscribe = navigation
  .dangerouslyGetParent()
  .addListener('tabPress', (e) => {
    // Do something
  });
```

### 多层嵌套导航

```jsx
navigation.navigate('Root', {
  screen: 'Settings',
  params: {
    screen: 'Sound',
    params: {
      screen: 'Media',
    },
  },
});
```

### 禁止作为初始化的导航页面

```jsx
navigation.navigate('Root', {
  screen: 'Settings',
  initial: false,
});
```

### 嵌套导航标题显示处理

```jsx
function Home() {
  return (
    <NestedStack.Navigator>
      <NestedStack.Screen name="Profile" component={Profile} />
      <NestedStack.Screen name="Settings" component={Settings} />
    </NestedStack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="EditPost" component={EditPost} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
```

> **通过headerShown设置是否显示父标题**



> **在项目中尽量减少嵌套，否则会在低版本客户端造成性能问题**



## 导航生命周期

### hooks useFocusEffect及useIsFocused使用

```jsx
//useFocusEffect
import { useFocusEffect } from '@react-navigation/native';

function Profile() {
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  return <ProfileContent />;
}
```

```jsx
//useIsFocused
import { useIsFocused } from '@react-navigation/native';

// ...

function Profile() {
  const isFocused = useIsFocused();

  return <Text>{isFocused ? 'focused' : 'unfocused'}</Text>;
}
```



