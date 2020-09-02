<template>
	<div>
		<b-carousel
			id="carousel-1"
			v-model="slide"
			:interval="4000"
			controls
			indicators
			background="#ababab"
			img-width="1024"
			img-height="480"
			style="text-shadow: 1px 1px 2px #333;"
			@sliding-start="onSlideStart"
			@sliding-end="onSlideEnd"
		>
			<!-- Text slides with image -->
			<template v-if="!loading">
				<router-link
					v-for="movie in sliderMovie"
					:key="movie.id"
					:to="'/movie-details/' + movie.id"
				>
					<b-carousel-slide
						:caption="movie.title"
						:img-src="movie.bigImage"
					></b-carousel-slide>
				</router-link>
			</template>
			<div v-else class="text-center mt-5 pt-5">
				loading...
				<!-- <b-icon icon="arrow-clockwise" animation="spin" font-scale="4"></b-icon> -->
			</div>
		</b-carousel>

		<!-- <p class="mt-4">
			Slide #: {{ slide }}<br />
			Sliding: {{ sliding }}
		</p> -->
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			slide: 0,
			sliding: null,
		};
	},
	computed: {
		...mapGetters(['sliderMovie', 'loading']),
	},
	methods: {
		onSlideStart(slide) {
			this.sliding = true;
		},
		onSlideEnd(slide) {
			this.sliding = false;
		},
	},
};
</script>
<style lang="scss">
.carousel {
	.carousel-inner {
		height: 500px;
		.carousel-item {
			height: 500px;
			img {
				height: 500px;
				object-fit: cover;
			}
		}
	}
}
</style>
