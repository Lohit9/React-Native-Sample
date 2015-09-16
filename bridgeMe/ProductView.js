
'use strict'

var React = require('react-native');

var ProductViewManager = require('NativeModules').ProductViewManager;
var { requireNativeComponent } = React;

var NativeProductView = requireNativeComponent('ProductView', ProductView);

var SHOP_DOMAIN = "the-app-boutique.myshopify.com";
var API_KEY ="506ede8b60f86fbf86109a762fe8093d";
var CHANNEL_ID = "9060547";
var PRODUCT_ID ="";
var MERCHANT_ID= "merchant.com.theappboutique.hackdays";

var {
  Modal,
  Component,
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;


exports.framework = 'React';
exports.title = '<Modal>';


class ProductView extends React.Component
{

  constructor(props) {
       super(props);
       this.state = {
           domain: SHOP_DOMAIN ,
           apikey: API_KEY ,
           channelid:CHANNEL_ID

       };
   }

 componentDidMount() {
    ProductViewManager.loadProductWithiD(PRODUCT_ID);
 }

  render() {


    return (
      <NativeProductView  style={styles.container}  {...this.props}  /> );


  }

  setter(domain,apikey,channelid)
   {

      if (domain == '') {
        return;
      }
      ProductViewManager.setDomain(domain,apikey,channelid, (error,domain,apikey,channelid) => {
        if (error) {
          console.error(error);
        } else {
          this.setState({
            domain: domain,
            apikey:apikey,
            channelid: channelid


     });
    }
  })
}


}var styles = StyleSheet.create({
  container:{
    flex: 1
  },
  Modal:{

  }
});


module.exports = ProductView;
