<template>
	<div id="app">
		<navbar-app></navbar-app>
		<transition name="fade">
			<router-view />
		</transition>
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
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
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
