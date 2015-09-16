'use strict';

var React = require('react-native');
//var FAKE_DATA = [{volumeInfo: {title: 'SOYLENT DRINK',price:'$50',imageLinks: {thumbnail: 'https://cdn.shopify.com/s/files/1/0970/4566/products/drink_homehero.a4633eecd61a_1024x1024.jpg?v=1440542094'}}}
//];
var ProductDetail = require('./ProductDetail');

var text = '{ "products" : [' +
'{ "title":"1Password T-shirt" , "images":"https://cdn.shopify.com/s/files/1/0653/5101/products/chest_black.png?v=1439225208" },' +
'{ "title":"Automatic Adapter (2nd Generation)" , "images":"https://cdn.shopify.com/s/files/1/0653/5101/products/chest_black.png?v=1439225208" },' +
'{ "title":"Scarf" , "images":"https://cdn.shopify.com/s/files/1/0653/5101/products/chest_black.png?v=1439225208" },' +
'{ "title":"Smooth Taupe Calfskin Strap" , "images":"https://cdn.shopify.com/s/files/1/0653/5101/products/chest_black.png?v=1439225208" },' +
'{ "title":"Smooth Taupe Calfskin Strap" , "images":"https://cdn.shopify.com/s/files/1/0653/5101/products/chest_black.png?v=1439225208"}]}';


var {
    Image,
    StyleSheet,
    Text,
    View,
    Component,
    ListView,
    TouchableHighlight,
    ActivityIndicatorIOS
   } = React;

var styles = StyleSheet.create({
  container:{
    flex: 1,
       flexDirection: 'row',
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: '#F5FCFF',
       padding: 10
  },
  thumbnail: {
       width: 53,
       height: 81,
       marginRight: 10
   },
   rightContainer: {

       flex: 1
   },
   title: {
        fontSize: 20,
        marginBottom: 8
    },
    price: {
        color: '#656565'
    },
    separator: {
       height: 1,
       backgroundColor: '#dddddd'
   },
   listView: {
       backgroundColor: '#F5FCFF'
   },
   loading: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
   }

});

class List extends Component {
  constructor(props) {
       super(props);
       this.state = {
           isLoading: true,
           dataSource: new ListView.DataSource({
               rowHasChanged: (row1, row2) => row1 !== row2
           })
       };
   }
   componentDidMount() {
          this.fetchData();
      }

      fetchData() {
        var responseData = JSON.parse(text) ;

              this.setState({
                  dataSource: this.state.dataSource.cloneWithRows(responseData.products),
                  isLoading: false
              });


      }
      render() {
           if (this.state.isLoading) {
               return this.renderLoadingView();
           }

           return (
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderproducts.bind(this)}
                    style={styles.listView}
                    />
            );
    }

    renderLoadingView() {
        return (
            <View style={styles.loading}>
                <ActivityIndicatorIOS
                    size='large'/>
                <Text>
                    Loading Products...
                </Text>
            </View>
        );
    }


    renderproducts(products) {
         return (
              <TouchableHighlight onPress={() => this.showproductsDetail(products)}  underlayColor='#dddddd'>
                  <View>
                      <View style={styles.container}>

                          <View style={styles.rightContainer}>
                              <Text style={styles.title}>{products.title}</Text>



                              </View>
                      </View>
                      <View style={styles.separator} />
                  </View>
              </TouchableHighlight>
         );
     }
     showproductsDetail(products){
       this.props.navigator.push({
         title:products.title,
         component: ProductDetail,
         passProps:{products}
       });
     }
}

module.exports = List;
