<template>
	<div id="app">
		<navbar-app></navbar-app>
		<router-view />
		<footer-app></footer-app>
	</div>
</template>
<script>
import NavbarApp from '@/components/layout/NavbarApp';
import FooterApp from '@/components/layout/FooterApp';

export default {
	components: {
		NavbarApp,
		FooterApp,
	},
	created() {
		this.$store.dispatch('fetchMovieList');
	},
};
</script>

<style lang="scss">
#app {
	background: #1d1d1d;
	// #171717
	color: #5a5a5a;
	height: 100%;
}
// a {
// 	text-decoration: none;
// }
</style>
