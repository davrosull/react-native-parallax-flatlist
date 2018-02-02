import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FlatList as List, Dimensions, Animated, Text } from 'react-native';
import _ from 'lodash';

// Native driver for scroll events
// See: https://facebook.github.io/react-native/blog/2017/02/14/using-native-driver-for-animated.html
const AnimatedFlatList = Animated.createAnimatedComponent(List);

/* Component ==================================================================== */
class FlatList extends PureComponent {
  static propTypes = {
    ...List.propTypes,
  };

  constructor(props) {
    super(props);

    this._flatlist = undefined;
    this._scrollPos = new Animated.Value(0);

    this.state = {
      _flatlist: undefined,
    };
    // Native driver for scroll events
    const scrollEventConfig = {
      listener: this._onScroll,
      useNativeDriver: true,
    };

    this._onScrollHandler = Animated.event(
      [{ nativeEvent: { contentOffset: { y: this._scrollPos } } }],
      scrollEventConfig
    );
  }

  setNativeProps(nativeProps) {
    this._flatlist.setNativeProps(nativeProps);
  }

  applyPropsToParallaxImages = function(children, props) {
    if (Array.isArray(children)) {
      return React.Children.map(children, child => {
        if (Array.isArray(child)) {
          return applyPropsToParallaxImages(child, props);
        }
        if (child.type.displayName === 'ParallaxImage') {
          return React.cloneElement(child, props);
        }
        return child;
      });
    }

    if (children.type.displayName === 'ParallaxImage') {
      return React.cloneElement(children, props);
    }
    return children;
  };

  render() {
    var { ref, children, onScroll, renderItem, ...props } = this.props;
    var { _flatlist } = this.state;
    var handleScroll = onScroll
      ? event => {
          this._onScrollHandler(event);
          onScroll(event);
        }
      : this._onScrollHandler;

    return (
      <AnimatedFlatList
        ref={list => {
          this._flatlist = list;
          this.setState({ _flatlist: list });
        }}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        renderItem={item => {
          const parallaxProps = {
            scrollPosition: this._scrollPos,
            flatlistRef: this._flatlist,
          };
          const renderedItem = React.cloneElement(
            renderItem(item),
            parallaxProps
          );

          const parallaxedItem = React.cloneElement(
            renderedItem,
            parallaxProps,
            this.applyPropsToParallaxImages(
              renderedItem.props.children,
              parallaxProps
            )
          );

          return parallaxedItem;
        }}
        {...props}
      />
    );
  }
}

/* Export Component ==================================================================== */
export default FlatList;
