'use strict';

var React = require('react-native');

var {
    StyleSheet,
    Text,
    View,
    Component,
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
    }
});

class ProductDetail extends Component {
    render() {
        var book = this.props.book;
        var imageURI = book.images.src;
        var description = (typeof book.body_html !== 'undefined') ? book.body_html: '';
        var StrippedString = description.replace(/(<([^>]+)>)/ig,"");
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{uri: imageURI}} />
                <Text style={styles.description}>{StrippedString}</Text>
            </View>
        );
    }
}

module.exports = ProductDetail;
