// Parallax effect inspired by https://github.com/oblador/react-native-parallax/

import React, { Component } from 'react';
import {
  View,
  ViewPropTypes,
  Image,
  Animated,
  Easing,
  ActivityIndicator,
  findNodeHandle,
  StyleSheet,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

export default class ParallaxImage extends Component {
  static propTypes = {
    ...Image.propTypes,
    flatlistRef: PropTypes.object,
    scrollPosition: PropTypes.object,
  };

  static defaultProps = {
    parallaxFactor: 0.2,
  };

  constructor(props) {
    super(props);
    this.isLayoutStale = true;
    this.state = {
      offset: 0,
      width: 0,
      height: 0,
    };
  }

  setNativeProps(nativeProps) {
    this._container.setNativeProps(nativeProps);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.isLayoutStale = true;
    }
  }

  handleLayout = event => {
    if (this.isLayoutStale) {
      this._container.measure(this.handleMeasure);
    }
  };

  handleMeasure = (ox, oy, width, height, px, py) => {
    this.isLayoutStale = false;
    const { flatlistRef } = this.props;

    this.setState({
      offset: py,
      height,
      width,
    });
  };

  get image() {
    const { offset, width, height } = this.state;
    const { scrollPosition, parallaxFactor, style, ...other } = this.props;

    var parallaxPadding = height * parallaxFactor;

    var parallaxStyle = {
      width: width,
      height: height + parallaxPadding * 2,
    };
    if (scrollPosition) {
      parallaxStyle.transform = [
        {
          translateY: scrollPosition.interpolate({
            inputRange: [offset - height * 2, offset + height * 2],
            outputRange: [-parallaxPadding, parallaxPadding],
            extrapolate: 'clamp',
          }),
        },
      ];
    } else {
      parallaxStyle.transform = [{ translateY: -parallaxPadding }];
    }

    return (
      <Animated.View style={[StyleSheet.absoluteFill, style.container]}>
        <Animated.Image
          {...other}
          style={[StyleSheet.absoluteFill, parallaxStyle]}
          resizeMode={'cover'}
        />
      </Animated.View>
    );
  }

  render() {
    return (
      <View
        ref={c => {
          this._container = c;
        }}
        type={'ParallaxImage'}
        pointerEvents={'none'}
        style={[this.props.style, { overflow: 'hidden' }]}
        onLayout={this.handleLayout}
      >
        {this.image}
      </View>
    );
  }
}
