import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

const HomePage = () => {
return (
   <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
     <StatusBar backgroundColor="blue" barStyle="light-content" />
       <Text>HomePage</Text>
   </View>
 )
}

const styles = StyleSheet.create({});

export default HomePage;