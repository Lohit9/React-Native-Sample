'use strict';

var React = require('react-native');
var Featured = require('./Products');
var Search = require('./Search');

var {
    AppRegistry,
    TabBarIOS,
    Component
   } = React;

class bridgeMe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'products'
        };
    }

    render() {
        return (
            <TabBarIOS selectedTab={this.state.selectedTab}>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'Products'}
                    icon={{uri:'featured'}}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'Products'
                        });
                    }}>
                    <Featured/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'search'}
                    icon={{uri:'search'}}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'search'
                        });
                    }}>
                    <Search/>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}

AppRegistry.registerComponent('bridgeMe', () => bridgeMe);
