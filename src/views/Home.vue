<template>
	<div class="home">
		<header-app></header-app>
		<div class="filters bg-dark-gray-0  pt-5 pb-5">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<div class="group-input">
							<label for="search">Search Term:</label>
							<input
								type="search"
								class="form-control filters__custom-input bg-dark-gray-1 font-dark-gray-3 border-dark-gray-1"
								v-model="search"
							/>
						</div>
					</div>
					<div class="col-md-4">
						<div class="group-input">
							<label for="">genre:</label>
							<select
								class="form-control filters__custom-input bg-dark-gray-1 font-dark-gray-3 border-dark-gray-1"
								v-model="selectedGenre"
							>
								<option value="">All</option>
								<option v-for="genre in genres" :key="genre" :value="genre">{{
									genre
								}}</option>
							</select>
						</div>
					</div>
					<div class="col-md-4">
						<div class="group-input">
							<label for="">Rating:</label>
							<select
								class="form-control filters__custom-input bg-dark-gray-1 font-dark-gray-3 border-dark-gray-1"
								v-model="selectedRate"
							>
								<option value="">All</option>
								<option v-for="rate in rates" :key="rate" :value="rate">{{
									rate
								}}</option>
							</select>
						</div>
					</div>
					<div class="col-md-4">
						<div class="group-input">
							<label for="">year:</label>
							<select
								class="form-control filters__custom-input bg-dark-gray-1 font-dark-gray-3 border-dark-gray-1"
								v-model="selectedYear"
							>
								<option value="">All</option>
								<option v-for="year in years" :value="year" :key="year">{{
									year
								}}</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="movies pt-5 pb-5">
				<div
					class="row"
					v-infinite-scroll="loadMore"
					infinite-scroll-disabled="busy"
					infinite-scroll-distance="10"
				>
					<template
						v-if="infiniteScrollList.length != 0 && filteredMovie.length !== 0"
					>
						<template v-if="filteredMovie.length !== 0">
							<card-item
								v-for="movie in infiniteScrollList"
								:key="movie.id"
								:movie="movie"
							>
							</card-item>
						</template>
						<p class="text-center" v-else>no results found...</p>
					</template>
					<p
						class="text-center"
						v-else-if="
							infiniteScrollList.length == 0 && filteredMovie.length == 0
						"
					>
						no results found...
					</p>
					<LoadingCard v-else />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import HeaderApp from '@/components/layout/HeaderApp';
import CardItem from '@/components/movie/CardItem';
import LoadingCard from '@/components/movie/LoadingCard';
import { mapGetters } from 'vuex';
import infiniteScroll from 'vue-infinite-scroll';
var count = 0;
export default {
	name: 'Home',
	data() {
		return {
			busy: false,
			search: '',
			selectedYear: '',
			selectedGenre: '',
			selectedRate: '',
			infiniteScrollList: [],
		};
	},
	computed: {
		...mapGetters(['getMoviesList', 'loading', 'genres', 'rates', 'years']),
		// this computed property will filter the movies list by the movie title, year, rate and genre
		// so it returned a new filtered movies
		filteredMovie() {
			return this.getMoviesList.filter((movie) => {
				if (
					movie.title.toLowerCase().includes(this.search.toLowerCase()) &&
					(this.selectedYear == movie.year || this.selectedYear == '') &&
					(this.selectedRate == movie.stars || this.selectedRate == '') &&
					(movie.genre
						.toLowerCase()
						.indexOf(this.selectedGenre.toLowerCase()) >= 0 ||
						this.selectedGenre == '')
				) {
					return movie;
				}
			});
		},
	},
	directives: { infiniteScroll },
	watch: {
		selectedGenre() {
			this.resetAndRefilter();
		},
		selectedRate() {
			this.resetAndRefilter();
		},
		selectedYear() {
			this.resetAndRefilter();
		},
		search() {
			this.resetAndRefilter();
		},
	},
	methods: {
		// this method use for enable the infinite scroll
		loadMore: function() {
			// infinite scroll will be disabled if the value of this attribute is true.
			this.busy = true;
			setTimeout(() => {
				/* we can solve the infinite scrolling in another way if we have an api 
					divided by page and every time the loadMore function fired we send another
					request to get the next page data and push it in our array
				*/
				// if the infiniteScrollList is empty at the first time I get the first slice of data from filteredMovie
				if (this.infiniteScrollList.length == 0) {
					this.infiniteScrollList = [...this.filteredMovie.slice(0, 4)];
				}
				// if we get all the data form filteredMovie array we stop scrolling and loading and pushing new data to the infiniteScrollList array 
				if (this.infiniteScrollList.length != this.filteredMovie.length) {
					this.infiniteScrollList = [
						...this.infiniteScrollList,
						...this.filteredMovie.slice(
							this.infiniteScrollList.length,
							this.infiniteScrollList.length + 4
						),
					];
				} else {
					this.busy = false;
				}
				this.busy = false;
			}, 1000);
		},
		// we use this function when the user use the filter
		resetAndRefilter() {
			this.filteredMovie;
			this.infiniteScrollList = [];
			this.loadMore();
		},
	},
	components: {
		HeaderApp,
		CardItem,
		LoadingCard,
	},
	created() {},
};
</script>
<style lang="scss" scoped>
.filters {
	&__custom-input {
		&:focus {
			background-color: #1d1d1d;
			border: 1px solid transparent;
		}
	}
}
</style>
