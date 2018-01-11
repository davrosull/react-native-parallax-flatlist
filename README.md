# react-native-parallax-flatlist

A drop in replacement for `FlatList` that allows for a Parallax effect on images.

## Installation

```
npm install --save react-native-parallax-flatlist
```

## Usage

```js
import FlatList, { ParallaxImage } from './react-native-parallax-flatlist';

export default class ParallaxView extends Component {

    const data = [
  {
    title: '(=^ ◡ ^=)',
    image: 'http://loremflickr.com/640/480/cat',
  },
  {
    title: 'ｏ（Ｕ・ω・）⊃',
    image: 'http://loremflickr.com/640/480/dog',
  }];

  render() {
    return (
      <FlatList
        data={data}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <View style={{height: 200}}>
            <ParallaxImage
              style={[StyleSheet.absoluteFill]}
              source={{ uri: item.image }}
              parallaxFactor={0.2}
            />
            <Text style={{
                fontSize: 20,
                textAlign: 'center',
                lineHeight: 25,
                fontWeight: 'bold',
                color: 'white',
            }}>{item.title}</Text>
          </View>
        )}
      />
    );
  }
}
```

## `FlatList` Properties

Any [`FlatList` property](http://facebook.github.io/react-native/docs/flatlist.html).

## `ParallaxImage` Properties

Any [`Image` property](http://facebook.github.io/react-native/docs/image.html) and the following:

| Prop                 | Description                                                                                      | Default |
| -------------------- | ------------------------------------------------------------------------------------------------ | ------- |
| **`parallaxFactor`** | The speed of the parallax effect. Larger values require taller images or they will be zoomed in. | `0.2`   |

## Demo

![Demo](https://cloud.githubusercontent.com/assets/378279/8894786/81b493f8-33c3-11e5-9a5a-8695642c6ee7.gif)

## Example

Check full example in the `Example` folder.

## Credits

Inspiration taken from [react-native-parallax](https://github.com/oblador/react-native-parallax) and [react-native-snap-carousel](https://github.com/archriss/react-native-snap-carousel)

## License

[MIT License](http://opensource.org/licenses/mit-license.html). © Joel Arvidsson
