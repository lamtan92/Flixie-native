import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MovieList from "./MovieList.js";
import MovieProfile from "./MovieProfile.js";
import ErrorView from "./ErrorView.js";
import TEST_DATA from "./test.json";
import { setTimeout } from "core-js/library/web/timers";
import { resolve } from "./node_modules/any-promise/index";
import { StackNavigator } from "react-navigation";

const Routes = StackNavigator({
  MovieList: { screen: MovieList },
  MovieProfile: { screen: MovieProfile, navigationOptions: ({navigation}) => ({
    title: `${navigation.state.params.title}`
  })}
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.fetchWithPage = this.fetchWithPage.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.refresh = this.refresh.bind(this);
    this.state = {
      movies: [],
      loading: false,
      refreshing: false,
      page: 1,
      error: null
    };
  }

  fetchWithPage(page) {
    this.setState(
      {
        loading: true
      },
      () => {
        fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed&page=${
            page
          }`
        )
          .then(data => data.json())
          .then(json => {
            this.setState({
              loading: false,
              refreshing: false,
              movies: this.state.movies.concat(json.results)
            });
          })
          .catch((error) => {
            alert(error); 
            this.setState({
              loading: false,
              error: error,
              refreshing: false
            });
          });
      }
    );
  }

  loadMore() {
    const newPage = this.state.page + 1;
    this.setState(
      {
        page: newPage
      },
      () => {
        this.fetchWithPage(newPage);
      }
    );
  }

  refresh() {
    this.setState(
      {
        movies: [],
        page: 1,
        refreshing: true
      },
      () => {
        this.fetchWithPage(1);
      }
    );
  }

  componentWillMount(props) {
    this.fetchWithPage(1);
  }

  render() {
    if (this.state.error!=null) {
      return (
        <ErrorView error={this.state.error}/>
      );
    }
    return (
      <Routes
        screenProps={{
          movies: this.state.movies,
          loading: this.state.loading,
          refreshing: this.state.refreshing,
          loadMore: this.loadMore,
          refresh: this.refresh
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
