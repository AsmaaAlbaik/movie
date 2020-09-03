<template>
	<div>
		<b-navbar toggleable="lg" type="dark" variant="dark">
			<b-navbar-brand href="#" to="/" class="font-bold">AMovies</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav class="ml-auto">
					<!-- <b-nav-item href="#" to="/">Home</b-nav-item> -->
					<!-- <b-nav-item href="#" to="/about">About</b-nav-item> -->
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>
<style lang="scss" scoped>
.navbar-brand {
	&::first-letter {
		padding: 0 3px;
		margin-right: 5px;
		background: #ffc107;
		color: #333;
		font-weight: bold;
		font-size: 1.5rem;
	}
}
</style>
