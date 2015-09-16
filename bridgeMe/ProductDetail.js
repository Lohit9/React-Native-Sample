'use strict';

var React = require('react-native');

var {
    StyleSheet,
    Text,
    View,
    Component,
    TouchableHighlight,
    Image
   } = React;

var styles = StyleSheet.create({
    container: {
        marginTop: 75,
        alignItems: 'center'
    },
    image: {
        width: 107,
        height: 165,
        padding: 10
    },
    description: {
        padding: 10,
        fontSize: 15,
        color: '#656565'
    },
    descriptions:{
      padding :20,
      fontSize:30,
      color: '#FF0000'
    },
    buttonText: {
  fontSize: 18,
  color: 'white',
  alignSelf: 'center'
},
button: {
  height: 40,
  flex: 1,
  flexDirection: 'row',
  backgroundColor: '#48BBEC',
  borderColor: '#48BBEC',
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 10,
  alignSelf: 'stretch',
  justifyContent: 'center'
},
button2:{
  height: 40,
  flex: 1,
  flexDirection: 'row',
  backgroundColor: '#48BBEC',
  borderColor: '#48BBEC',
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 10,
  alignSelf: 'stretch',
  justifyContent: 'center'

}
});

class ProductDetail extends Component {
    render() {
        var products = this.props.products;
        var imageURI = (typeof products.images[0] !== 'undefined') ? products.images[0].src : 'https://cdn.shopify.com/s/files/1/0698/0337/products/s24660.jpg?v=1440191247';

        var description = (typeof products.body_html !== 'undefined') ? products.body_html: '';
        var StrippedString = description.replace(/(<([^>]+)>)/ig,"");
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{uri:imageURI }} />
                <Text style={styles.description}>{StrippedString}</Text>
                <TouchableHighlight style={styles.button} underlayColor='#99d9f4'>
                  <Text style={styles.buttonText}>Checkout</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button2} underlayColor='#99d9f4'>
                  <Text style={styles.buttonText}>Buy With Apple Pay</Text>
                </TouchableHighlight>
                </View>

        );
    }
}

module.exports = ProductDetail;
