/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  PixelRatio,
} from 'react-native';
import FlatList, { ParallaxImage } from 'react-native-parallax-flatlist';

const IMAGE_WIDTH = Dimensions.get('window').width;
const IMAGE_HEIGHT = 200;
const PIXEL_RATIO = 2;
const PARALLAX_FACTOR = 0.2;
const IMAGE_URI_PREFIX =
  'https://loremflickr.com/' +
  IMAGE_WIDTH * PIXEL_RATIO +
  '/' +
  Math.round(IMAGE_HEIGHT * (1 + PARALLAX_FACTOR * PIXEL_RATIO) * PIXEL_RATIO) +
  '/';

const data = [
  {
    title: '(=^ ◡ ^=)',
    keyword: 'cat',
    image: 'cat',
  },
  {
    title: 'ｏ（Ｕ・ω・）⊃',
    keyword: 'dog',
    image: 'dog',
  },
  {
    title: '⊂((・⊥・))⊃',
    keyword: 'monkey',
    image: 'cat',
  },
  {
    title: '（・⊝・）',
    keyword: 'penguin',
    image: 'dog',
  },
  {
    title: '§・ω・§',
    keyword: 'sheep',
    image: 'cat',
  },
  {
    title: '/|\\( ;,;)/|\\',
    keyword: 'bat',
    image: 'dog',
  },
  {
    title: "-o,,o,,o'",
    keyword: 'ant',
    image: 'cat',
  },
  {
    title: '(*)>\n/ )  \n/"  ',
    keyword: 'bird',
    image: 'dog',
  },
  {
    title: '( )\n:(III)-\n( ) ',
    keyword: 'bee',
    image: 'cat',
  },
  {
    title: 'O_______O\n( ^ ~ ^ )\n(,,)()(,,)\n( )   ( )',
    keyword: 'bear',
    image: 'dog',
  },
];

export default class App extends Component<{}> {
  render() {
    return (
      <FlatList
        data={data}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <View style={[styles.overlay]}>
            <ParallaxImage
              style={[StyleSheet.absoluteFill]}
              source={{ uri: IMAGE_URI_PREFIX + item.keyword }}
              parallaxFactor={PARALLAX_FACTOR}
              vertical={true}
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.url}>
              Source: {IMAGE_URI_PREFIX + item.keyword}
            </Text>
          </View>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: IMAGE_HEIGHT,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 25,
    fontWeight: 'bold',
    color: 'white',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOpacity: 0.8,
  },
  url: {
    opacity: 0.5,
    fontSize: 10,
    position: 'absolute',
    color: 'white',
    left: 5,
    bottom: 5,
  },
});
