<template>
	<router-link
		:to="'/movie-details/' + movie.id"
		class="col-lg-3 col-md-4 col-sm-6"
	>
		<b-card
			:title="movie.title"
			:img-src="movie.image"
			:img-alt="movie.description"
			img-top
			tag="article"
			style="max-width: 20rem;"
			class="mb-2 font-light"
		>
			<b-card-text> year: {{ movie.year }} </b-card-text>
			<div class="card__overlay border-yellow-0">
				<div class="content">
					<div class="rating">
						<b-icon icon="star-fill" class="font-yellow-0" font-scale="2"></b-icon>
						<p class="font-bold font-light">{{ movie.stars }}/10</p>
					</div>
					<div class="genre">
						<p class="font-bold font-light">{{ movie.genre }}</p>
					</div>
					<button class="btn font-bold font-light bg-yellow-0 border-yellow-0">view details</button>
				</div>
			</div>
		</b-card>
	</router-link>
</template>
<script>
export default {
	props: ['movie'],
};
</script>
<style lang="scss" scoped>
a {
	text-decoration: none !important;
}
.card {
	border: none;
	border-radius: 1rem;
	background: transparent;
	.card-img,
	.card-img-top,
	.card-img-bottom {
		height: 380px;
		object-fit: cover;
		border-radius: 1rem;
		border: 2px solid #f1f1f1;
	}
	.card-img-top {
		position: relative;
	}
	.card-text {
		color: #5a5a5a;
	}
	&__overlay {
		background-color: rgba(51, 51, 51, 0.5);
		width: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
		display: none;
		vertical-align: middle;
		overflow: hidden;
		border: 3px solid;
		border-radius: 1rem;
		height: 380px;
		.content {
			vertical-align: middle;
			margin-top: 50%;

			p {
				font-size: 1.2rem;
				text-transform: capitalize;
			}
			button {
				text-transform: capitalize;
			}
		}
	}
	.card-body {
		padding: 0.25rem;
		.card-title {
			margin-bottom: 0;
		}
	}
	&:hover {
		.card__overlay {
			display: block;
		}
	}
}
</style>
