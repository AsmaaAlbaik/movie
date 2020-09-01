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
								<option value="2000">2000</option>
								<option value="2005">2005</option>
								<option value="2006">2006</option>
								<option value="2010">2010</option>
								<option value="2012">2012</option>
								<option value="2015">2015</option>
								<option value="2016">2016</option>
								<option value="2018">2018</option>
								<option value="2019">2019</option>
								<option value="2020">2020</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="movies pt-5 pb-5">
				<div class="row" v-if="!loading">
					<template v-if="filterMovie.length !== 0">
						<card-item
							v-for="movie in filterMovie"
							:key="movie.id"
							:movie="movie"
						>
						</card-item>
					</template>
					<p class="text-center" v-else>no results found...</p>
				</div>
				<div v-else class="text-center">
					<b-icon
						icon="arrow-clockwise"
						animation="spin"
						font-scale="4"
					></b-icon>
				</div>
			</div>
			<input type="text" v-model="movie.title" />
			<input type="text" v-model="movie.genre" />
			<input type="text" v-model="movie.year" />
			<input type="text" v-model="movie.stars" />
			<input type="text" v-model="movie.description" />
			<input type="file" @change="uploadImage" />
			<span>big size</span>
			<input type="file" @change="uploadBigImage" />
			<button class="btn btn-success" @click="AddMovieItem">save</button>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import HeaderApp from '@/components/layout/HeaderApp';
import CardItem from '@/components/movie/CardItem';
import { mapGetters } from 'vuex';
export default {
	name: 'Home',
	data() {
		return {
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
			rates: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			genres: [
				'Animation',
				'Action',
				'Adventure',
				'Comedy',
				'Drama',
				'Romantic',
			],
			selectedYear: '',
			selectedGenre: '',
			selectedRate: '',
			asmaa: '',
		};
	},
	computed: {
		...mapGetters(['getMoviesList', 'loading']),
		filterMovie() {
			// debugger;
			let filterdList = this.getMoviesList.filter((movie) => {
				if (
					movie.title.toLowerCase().includes(this.search.toLowerCase()) &&
					(this.selectedYear == movie.year || this.selectedYear == '') &&
					(this.selectedRate == movie.stars || this.selectedRate == '') &&
					(movie.genre.toLowerCase().indexOf(this.selectedGenre.toLowerCase()) >=
						0 ||
						this.selectedGenre == '')
				) {
					return movie;
				}
			});
			return filterdList;
		},
	},
	methods: {
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
	created() {},
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
