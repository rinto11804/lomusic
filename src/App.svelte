<script>
	import { Router, link, Route } from "svelte-routing";
	import Discover from "./components/Discover.svelte";
	import NewRelease from "./components/NewRelease.svelte";
	import Search from "./components/Search.svelte";

	import { getAccessToken } from "./lib/songStore";

	export let url = "/";
</script>

<Router {url}>
	<nav>
		<a href="/" use:link>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="1em"
				viewBox="0 0 576 512"
				><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
				/></svg
			>
			Home
		</a>
		<a href="/search" use:link>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="1em"
				viewBox="0 0 512 512"
				><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
				/></svg
			>
			Search
		</a>
		<a href="/discover" use:link>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="1em"
				viewBox="0 0 512 512"
				><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
				/></svg
			>
			Discover</a
		>
	</nav>
	{#await getAccessToken() then _}
		<main>
			<Route path="/" component={NewRelease} />
			<Route path="/search" component={Search} />
			<Route path="/discover" component={Discover} />
		</main>
	{/await}
</Router>

<style>
	svg {
		fill: white;
	}
	nav {
		border-radius: 0.45rem;
		background-color: #121212;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.5rem;
	}

	nav a {
	display:flex;
		color: whitesmoke;
		text-decoration: none;
		width: 100%;
		background-color: #1e1e1e;
		padding: 1rem;
		gap:1rem;
		border-radius: 0.45rem;
	}

	nav a:hover {
		background-color: #343434;
	}
	main {
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		border-radius: 0.45rem;
		background-color: #121212;
		overflow: scroll;
		gap: 3em;
		height: 100%;
		padding: 0.54rem;
	}

	@media (max-width: 530px) {
		:global(#app) {
			display: block;
			position: relative;
		}

		nav {
			z-index: 10;
			position: fixed;
			bottom: 0.65rem;
			left: 0;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;
			width: 100%;
		}
		nav a {
			padding: 0.45rem;
			text-align: center;
			width: 8rem;
		}
	}
</style>
