//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class ErrorView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.error}</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 
        "center", alignItems: 
        "center"
    },
});

//make this component available to the app
export default ErrorView;
