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
    fetchMovieList: ({ commit }, payload) => {
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
          commit("getMovieList", moviesList);
          commit("setLoading", false);
        })
        .catch((err) => {
          commit("setLoading", false);
          console.log(err);
        });
    },
    AddMovieItem: ({ commit }, payload) => {
      commit("setLoading", true);
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
        console.log(state.moviesList)
        return state.moviesList.find((movie) => {
          return movie.id === movieId;
        });
      };
    },
    genres(state) {
      return state.genres
    },
    rates(state) {
      return state.rates
    },
    years(state) { return state.years},
    loading(state) {
      return state.loading
    }
  },
  modules: {
  }
})
