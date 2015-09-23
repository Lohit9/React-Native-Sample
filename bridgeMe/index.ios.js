'use strict';

var React = require('react-native');
var ProductList = require('./List');
var ProductViewManager = require('NativeModules').ProductViewManager;
var { requireNativeComponent } = React;
var PRODUCT_ID ="";

var {
      StyleSheet,
     NavigatorIOS,
    AppRegistry,
    TabBarIOS,
    Component
   } = React;

   var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

class bridgeMe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            barTintColor : 'green'
        };
    }

    getInitialState() {
    return {
      navigationBarHidden: true
    };
  }

  hideNavBar() {
    this.setState({
      navigationBarHidden: true
    });
  }

  showNavBar() {
    this.setState({
      navigationBarHidden: false
    });
  }

    render() {
        return (
            <NavigatorIOS
                navigationBarHidden= {false}
                style={styles.container}
                initialRoute={{
            
            title: 'List of Products',
            component: ProductList,
             passProps: {
            hideNavBar: this.hideNavBar,
            showNavBar: this.showNavBar,
          }
            
            }}/>
        );
    }
}

AppRegistry.registerComponent('bridgeMe', () => bridgeMe);
