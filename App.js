import React from 'react';
import 'react-native-gesture-handler';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from './src/pages/home/home';
import DetailsPage from './src/pages/details/details';
import Icon from 'react-native-vector-icons/Ionicons';
import MainTabScreen from './src/pages/mainTabScreen';
import {DrawerContent} from './src/components/drawerContent';
import BookmarksPage from './src/pages/bookmarks/bookmarks';
import SettingsPage from './src/pages/settings/settings';
import SupportPage from './src/pages/support/support';
import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';


const Drawer = createDrawerNavigator();

const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    background: '#ffffff',
    text: '#333333'
  }
}

const CustomDarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    background: '#333333',
    text: '#ffffff'
  }
}
console.log('%c++[        ]','background: tomato', CustomDarkTheme);
const theme = CustomDarkTheme;


const App = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Drawer.Navigator 
            drawerContent={props => <DrawerContent {...props} />}
            initialRouteName="Home"
        >
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          <Drawer.Screen name="Bookmarks" component={BookmarksPage} />
          <Drawer.Screen name="Settings" component={SettingsPage} />
          <Drawer.Screen name="Support" component={SupportPage} />
          {/* <Drawer.Screen name="DetailsPage" component={DetailsStackScreen} /> */}
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};


export default App;
