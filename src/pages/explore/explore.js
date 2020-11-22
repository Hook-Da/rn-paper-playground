import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Animated, TextInput, ScrollView, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { StarRating } from './../../components';
import { markers, region } from './../../data/mapData';

import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
const mapAnimation = new Animated.Value(0);
let mapIndex = 0;

const ExplorePage = () => {
  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  useEffect(() => {
    mapAnimation.addListener(({value}) => {
        console.log('%c++[        ]','background: lime', value);
        let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
        console.log('%c++[        ]','background: blue', index);
        if (index >= markers.length) {
          index = markers.length - 1;
        }
        if (index <= 0) {
          index = 0;
        }

        clearTimeout(regionTimeout);

        const regionTimeout = setTimeout(() => {
          if( mapIndex !== index ) {
            mapIndex = index;
            const { coordinate } = markers[index];
            _map.current.animateToRegion(
              {
                ...coordinate,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta,
              },
              350
            );
          }
        }, 0);
      });
  }, [])
  //const [state, setState] = React.useState(initialMapState);
  const interpolations = markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });
    
    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerId = mapEventData._targetInst.return.key;
    let x = (markerId * CARD_WIDTH) + (markerId * 20); 
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }
    console.log('%c++[        ]','background: prange', _scrollView);
    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  }

return (
  <>
    <MapView
      ref={_map}
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      region={{
        latitude: 22.6293867,
        longitude: 88.4354486,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    >
      {
        markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale
              }
            ]
          }
          return (
            <Marker 
              onPress={event=> onMarkerPress(event)}
              key={index} 
              coordinate={marker.coordinate}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('../../assets/map_marker.png')}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </Marker>
      );
        })
      }
    </MapView>
    <View style={styles.searchBox}>
        <TextInput 
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{flex:1,padding:0}}
        />
        <Ionicons name="ios-search" size={20} />
      </View>
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{ // iOS only
          // top:0,
          // left:0,
          // bottom:0,
          //right:20
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === 'android' ? 20 : 20
        }}
      >
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.chipsItem}>
            {category.icon}
            <Text>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Animated.ScrollView
        ref={(ref) => {
          _scrollView.current = ref;
          console.log('%c++[        ]','background: green', _scrollView);
        }}
        onScroll={
          Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: mapAnimation
                  }
                }
              }
            ],
            {useNativeDriver: true}
          )
        }
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        pagingEnabled
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        contentInset={{
          left: SPACING_FOR_CARD_INSET,
          right: SPACING_FOR_CARD_INSET
        }}
        contentContainerStyle={{paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0}}
      >
        {
          markers.map((marker, index) => (
            <View
              key={index} 
              style={styles.card}>
                <Image 
                  source={marker.image}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View
                  style={styles.textContent}
                >
                  <Text
                    numberOfLines={1}
                    style={styles.cardtitle}
                  >{marker.title}</Text>
                  <StarRating 
                    rating={marker.rating}
                    reviews={marker.reviews}
                  />
                  <Text
                    numberOfLines={1}
                    style={styles.cardDescription}
                  >{marker.description}</Text>
                  <View style={[styles.button]}>
                    <TouchableOpacity
                      onPress={() => {}}
                      style={[
                        styles.signIn,
                       { 
                         borderWidth: 1,
                         borderColor: '#ff6647'}
                      ]}
                    >
                      <Text style={[styles.textSign, {color: '#ff6647'}]}>Order now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </View>
          ))
        }
      </Animated.ScrollView>
    </>
 )
}

const styles = StyleSheet.create({
  map: {
    height: '100%'
  },
  bubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    //width: 250
  },
  container: {
    flex: 1,
  },
  searchBox: {
    position:'absolute', 
    marginTop: Platform.OS === 'ios' ? 40 : 20, 
    flexDirection:"row",
    backgroundColor: '#fff',
    width: '90%',
    alignSelf:'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position:'absolute', 
    top:Platform.OS === 'ios' ? 90 : 80, 
    paddingHorizontal:10
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection:"row",
    backgroundColor:'#fff', 
    borderRadius:20,
    padding:8,
    paddingHorizontal:20, 
    marginHorizontal:10,
    height:35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width:50,
    height:50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
      width: '100%',
      padding:5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3
  },
  textSign: {
      fontSize: 14,
      fontWeight: 'bold'
  }
});

const categories = [
  { 
    name: 'Fastfood Center', 
    icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food-fork-drink" size={18} />,
  },
  {
    name: 'Restaurant',
    icon: <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />,
  },
  {
    name: 'Dineouts',
    icon: <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />,
  },
  {
    name: 'Snacks Corner',
    icon: <MaterialCommunityIcons name="food" style={styles.chipsIcon} size={18} />,
  },
  {
    name: 'Hotel',
    icon: <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />,
  },
]

export default ExplorePage;


// <Marker
//         coordinate={{
//           latitude: 37.78825,
//           longitude: -122.4324,
//         }}
//         image={require('./../../assets/map_marker.png')}
//         title="Hello World"
//         description="Show must go on"
//       >
//         <Callout tooltip>
//           <View style={{justifyContent: 'center', alignItems: 'center'}}>
//             <View style={styles.bubble}>
//               <Text>Name of restoran</Text>
//               <Text>Description of restoran</Text>
//               <Image 
//                 source={require('./../../assets/hulk.jpg')}
//                 style={{
//                   height: 100,
//                   width: 230,
//                   resizeMode: 'cover'
//                 }}
//               />
//             </View>
//             <View style={{
//               borderWidth: 16,
//               borderColor: 'transparent',
//               borderTopColor: '#fff',
//               width: 32,
//               transform: [{translateY: -0.5}]
//             }}></View>
//           </View>
//         </Callout>
//       </Marker>