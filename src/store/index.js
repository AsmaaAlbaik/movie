import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    moviesList: [],
  },
  mutations: {
    // this mutation use to put the movies whitch return from the fecth action  
    getMovieList: (state, payload) => {
      state.moviesList = payload
    },
    // this mutation use to push a new movie to the moviesList array  
    setMovieItem: (state, payload) => {
      state.moviesList.push(payload)
    }
  },
  actions: {
    fetchMovieList: ({ commit }, payload) => {
      // commit("setLoading", true);
      // commit("clearError");
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
        })
        .catch((err) => {
          // commit("setLoading", false);
          // commit("setError", err);
          console.log(err);
        });
    },
    AddMovieItem: ({ commit }, payload) => {
      // commit("setLoading", true);
      // commit("clearError");
      return firebase
        .database().ref('movies')
        .push(payload)
        .then((movie) => {
          const key = movie.key
          commit("setMovieItem", {
            ...payload,
            id: key
          });
          // commit("setLoading", false);
          return 'success';
        })
        .catch((err) => {
          // commit("setLoading", false);
          // commit("setError", err);
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
  },
  modules: {
  }
})
