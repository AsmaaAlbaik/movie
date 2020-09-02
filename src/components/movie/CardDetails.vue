<template>
	<div class="container">
		<div class="movie-details pt-5 pb-5">
			<div class="row" v-if="loadedMovie !== undefined">
				<div class="col-md-4">
					<div class="movie-details__image border-yellow-0">
						<img :src="loadedMovie.image" :alt="loadedMovie.title" />
					</div>
				</div>
				<div class="col-md-8">
					<div class="movie-details__description">
						<h2 class="movie-title font-bold font-light">{{ loadedMovie.title }}</h2>
						<p class="movie-rate font-light">
							{{ loadedMovie.stars }}
							<b-icon
								icon="star-fill"
								class="font-yellow-0"
								font-scale="1"
							></b-icon>
						</p>
						<div class="genre-and-year">
							<span class="year font-light">{{ loadedMovie.year }}</span>
							<p class="genre font-light">
								{{ loadedMovie.genre }}
							</p>
						</div>
						<p class="font-light">{{ loadedMovie.description }}</p>
					</div>
				</div>
			</div>
			<p v-else class="text-center">loading...</p>
		</div>
	</div>
</template>
<script>
import CardItem from '@/components/movie/CardItem';
export default {
	data() {
		return {
			id: this.$route.params.id,
		};
	},
	computed: {
		loadedMovie() {
			console.log(this.$store.getters.loadedMovie(this.id))
			return this.$store.getters.loadedMovie(this.id);
		},
	},
};
</script>
<style lang="scss" scoped>
.movie-details {
	min-height: 82vh;
	&__image {
		border: 3px solid;
		border-radius: 1rem;
		height: 480px;
		img {
			height: 100%;
			border-radius: 1rem;
			width: 100%;
			object-fit: cover;
		}
	}
	&__description {
		.movie-title {
			font-size: 2.5rem;
		}
	}
}
</style>
