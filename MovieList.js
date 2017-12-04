//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from "react-native";
import MovieCard from "./MovieCard.js";

// create a component
class MovieList extends Component {
  render() {
    const screenProps = this.props.screenProps;
    const navigate = this.props.navigation.navigate;
    // const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <FlatList
          data={screenProps.movies}
          keyExtractor={movie => movie.id}
          renderItem={movieItem => (
            <MovieCard
              {...movieItem.item} 
              loadProfile={() => {
                navigate('MovieProfile', movieItem.item)
              }}
            />
          )}
          onRefresh={screenProps.refresh}
          onEndReached={screenProps.loadMore}
          onEndReachedThreshold={0.05}
          refreshing={screenProps.refreshing}
          ListFooterComponent={() => (
            <View style={{ flex: 1, padding: 10 }}>
              <ActivityIndicator size="large" />
            </View>
          )}
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

//make this component available to the app
export default MovieList;
