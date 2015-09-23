'use strict';

var React = require('react-native');
var ProductViewManager = require('NativeModules').ProductViewManager;
var PRODUCT_ID ="";
var REQUEST_URL = String(ProductViewManager.shopdomain);



var {
  Navigator,
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
          fetch(REQUEST_URL)
          .then((response) => response.json())
          .then((responseData) => {
              this.setState({
                  dataSource: this.state.dataSource.cloneWithRows(responseData.products),
                  isLoading: false
              });
          })
          .done();
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
          var imageURI = (typeof products.images[0] !== 'undefined') ? products.images[0].src : '';
         return (
              <TouchableHighlight onPress={() => ProductViewManager.presentProductwithId(String(products.id))}  underlayColor='#dddddd'>
                  <View>
                      <View style={styles.container}>
                          <Image
                              source={{uri: imageURI}}
                              style={styles.thumbnail} />
                          <View style={styles.rightContainer}>
                              <Text style={styles.title}>{products.title}</Text>
                              <Text style={styles.author}>{products.variants[0].price}</Text>


                              </View>
                      </View>
                      <View style={styles.separator} />
                  </View>
              </TouchableHighlight>
         );
     }
  
}

module.exports = List;
