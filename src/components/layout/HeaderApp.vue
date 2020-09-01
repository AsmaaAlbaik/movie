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
			<b-carousel-slide v-for="movie in sliderMovie" :key="movie.id"
				:caption="movie.title"
				:img-src="movie.bigImage"
			></b-carousel-slide>

		</b-carousel>

		<!-- <p class="mt-4">
			Slide #: {{ slide }}<br />
			Sliding: {{ sliding }}
		</p> -->
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
	data() {
		return {
			slide: 0,
			sliding: null,
		};
	},
	computed: {
		...mapGetters(['sliderMovie'])
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
