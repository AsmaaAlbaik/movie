<template>
	<div class="home">
		<header-app></header-app>
		<div class="filters pt-5 pb-5">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<div class="group-input">
							<label for="search">Search Term:</label>
							<input
								type="search"
								class="form-control filters__custom-input"
								v-model="search"
							/>
						</div>
					</div>
					<div class="col-md-4">
						<div class="group-input">
							<label for="">genre:</label>
							<select
								class="form-control filters__custom-input"
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
								class="form-control filters__custom-input"
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
								class="form-control filters__custom-input"
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
				<template v-if="!loading">
					<div
						class="row"
						v-infinite-scroll="loadMore"
						infinite-scroll-disabled="busy"
						infinite-scroll-distance="4"
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
						<!-- <p class="text-center" v-if="busy === false">asmaa loading....</p> -->
					</div>
				</template>
				<div v-else class="text-center">
					loading...
					<!-- <b-icon
						icon="arrow-clockwise"
						animation="spin"
						font-scale="4"
					></b-icon> -->
				</div>
				<!-- <div
					v-infinite-scroll="loadMore"
					infinite-scroll-disabled="busy"
					infinite-scroll-distance="10"
				>
					<div v-for="(d, index) in filteredMovie" :key="d.title + index">
						{{ d.title }}
					</div>
				</div> -->
			</div>
			<!-- <input type="text" v-model="movie.title" />
			<input type="text" v-model="movie.genre" />
			<input type="text" v-model="movie.year" />
			<input type="text" v-model="movie.stars" />
			<input type="text" v-model="movie.description" />
			<input type="file" @change="uploadImage" />
			<span>big size</span>
			<input type="file" @change="uploadBigImage" />
			<button class="btn btn-success" @click="AddMovieItem">save</button> -->
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import HeaderApp from '@/components/layout/HeaderApp';
import CardItem from '@/components/movie/CardItem';
import { mapGetters } from 'vuex';
import infiniteScroll from 'vue-infinite-scroll';
var count = 0;
export default {
	name: 'Home',
	data() {
		return {
			busy: false,
			movie: {
				title: 'The Movie title',
				genre: 'Drama',
				year: '2015',
				stars: '8',
				description: 'short description about this movie',
				image: '',
				bigImage: '',
			},
			search: '',
			selectedYear: '',
			selectedGenre: '',
			selectedRate: '',
			infiniteScrollList: [],
		};
	},
	computed: {
		...mapGetters(['getMoviesList', 'loading', 'genres', 'rates', 'years']),
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
	methods: {
		loadMore: function() {
			this.busy = true;
			setTimeout(() => {
				console.log('asmaa');
				if (this.infiniteScrollList.length == 0) {
					this.infiniteScrollList = [...this.filteredMovie.slice(0, 4)];
				}
				if (this.infiniteScrollList.length != this.filteredMovie.length) {
					this.infiniteScrollList = [
						...this.infiniteScrollList,
						...this.filteredMovie.slice(
							this.infiniteScrollList.length,
							this.infiniteScrollList.length + 4
						),
					];
					this.busy = true;
				}
				this.busy = false;
			}, 1000);
		},
		AddMovieItem() {
			this.$store.dispatch('AddMovieItem', {
				title: this.movie.title,
				genre: this.movie.genre,
				year: this.movie.year,
				stars: this.movie.stars,
				description: this.movie.description,
				image: this.movie.image,
				bigImage: this.movie.bigImage,
			});
		},
		uploadImage(event) {
			const files = event.target.files;
			let filename = files[0].name;
			// check if the uploaded file dose have a valid extention
			if (filename.lastIndexOf('.') <= 0) {
				return alert('Please add a valid file !');
			}
			// translate a bainary file to string which I can uploaded
			const fileReader = new FileReader();
			fileReader.addEventListener('load', () => {
				this.movie.image = fileReader.result;
				// console.log(this.imageUrl)
			});
			fileReader.readAsDataURL(files[0]);
			this.movie.image = files[0];
		},
		uploadBigImage(event) {
			const files = event.target.files;
			let filename = files[0].name;
			// check if the uploaded file dose have a valid extention
			if (filename.lastIndexOf('.') <= 0) {
				return alert('Please add a valid file !');
			}
			// translate a bainary file to string which I can uploaded
			const fileReader = new FileReader();
			fileReader.addEventListener('load', () => {
				this.movie.bigImage = fileReader.result;
				// console.log(this.imageUrl)
			});
			fileReader.readAsDataURL(files[0]);
			this.movie.bigImage = files[0];
		},
	},
	components: {
		HeaderApp,
		CardItem,
	},
	created() {
		// this.loadMore();
	},
};
</script>
<style lang="scss" scoped>
.filters {
	background-color: #171717;
	&__custom-input,
	&__custom-input:focus {
		background-color: #1d1d1d;
		border: 1px solid transparent;
		color: #a2a2a2;
		&::placeholder {
		}
	}
}
</style>
