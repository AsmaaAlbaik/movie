import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    moviesList: [],
    // this value should came from the database if we bulit a full system
    rates: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    // this value should come from the database if we bulit a full system
    genres: [
      'Animation',
      'Action',
      'Adventure',
      'Comedy',
      'Drama',
      'Romance',
      'Family',
    ],
    // this value should come from the database if we bulit a full system
    years: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
    loading: false
  },
  mutations: {
    // this mutation use to put the movies whitch return from the fecth action  
    getMovieList: (state, payload) => {
      state.moviesList = payload
    },
    // this mutation use to push a new movie to the moviesList array  
    setMovieItem: (state, payload) => {
      state.moviesList.push(payload)
    },
    setLoading: (state, payload) => {
      state.loading = payload
    }
  },
  actions: {
    // this action will fetch the data from the firebase by send a request when the component created
    fetchMovieList: ({ commit }, payload) => {
      // mutate the loading state to start loading
      commit("setLoading", true);
      firebase
        .database().ref('movies')
        .once('value')
        .then((movie) => {
          const moviesList = [];
          const obj = movie.val();
          for (let key in obj) {
            moviesList.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              stars: obj[key].stars,
              year: obj[key].year,
              genre: obj[key].genre,
              image: obj[key].image,
              bigImage: obj[key].bigImage,
            });
          }
          // I commit the getMovieList mutation to mutate the movielist state and put the initial value on the state
          commit("getMovieList", moviesList);
          // mutate the loading state to stop loading
          commit("setLoading", false);
        })
        .catch((err) => {
          // mutate the loading state to stop loading
          commit("setLoading", false);
          console.log(err);
        });
    },
    // I created this action to add new movie to the firebase
    AddMovieItem: ({ commit }, payload) => {
      commit("setLoading", true);
      // here I return a Promise so we can use the result later after the action dispatched 
      // so we can use then(res) => {} to excecute some thing depands on the returned result 
      // for example to show an alert message when it success or fail
      return firebase
        .database().ref('movies')
        .push(payload)
        .then((movie) => {
          const key = movie.key
          commit("setMovieItem", {
            ...payload,
            id: key
          });
          commit("setLoading", false);
          return 'success';
        })
        .catch((err) => {
          commit("setLoading", false);
          console.log(err);
          return err;
        });
    },
  },
  getters: {
    // this getters use to return a list of movies 
    getMoviesList(state) { return state.moviesList },
    // this getter use to get just 3 items to show it in the slider 
    sliderMovie(state, getters) {
      return getters.getMoviesList.slice(0, 3);
    },
    // this getter use to get a specific item and show it in the movie details component 
    loadedMovie(state) {
      return (movieId) => {
        return state.moviesList.find((movie) => {
          return movie.id === movieId;
        });
      };
    },
    // this getter return all genres
    genres(state) {
      return state.genres
    },
    // this getter return all rates
    rates(state) {
      return state.rates
    },
    // this getters return all years
    years(state) { return state.years },
    //  this getter return the status of data if it return back from the database or not 
    // when laoding = false the http request return back with error or with success result
    //  so the loading will stop on the page
    //  if the loading = true so the http request is still fetching data from the server 
    // and response dose not back yet
    loading(state) {
      return state.loading
    }
  },
  modules: {
  }
})
