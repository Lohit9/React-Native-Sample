'use strict';

var React = require('react-native');
var BookList = require('./List');

var {
    StyleSheet,
    NavigatorIOS,
    Component
   } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

class Products extends Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
            title: 'List of Products',
            component: BookList
            }}/>
        );
    }
}

module.exports = Products;
