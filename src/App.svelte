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
		<a href="/" use:link>Home</a>
		<a href="/search" use:link>Search</a>
		<a href="/discover" use:link>Discover</a>
		<a href="/new-release" use:link>New Release</a>
	</nav>
	{#await getAccessToken() then _}
		<main>
			<Route path="/" component={NewRelease} />
			<Route path="/search" component={Search} />
			<Route path="/discover" component={Discover} />
			<Route path="/new-release" component={NewRelease} />
		</main>
	{/await}
</Router>

<style>
	nav {
		border-radius: 0.45rem;
		background-color: #121212;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.5rem;
	}

	nav a {
		color: whitesmoke;
		text-decoration: none;
		width: 100%;
		background-color: #1e1e1e;
		padding: 1rem;
		border-radius:0.45rem;
	}

	nav a:hover{
		background-color: #343434;
		
	}
	main {
		display: flex;
		align-items: center;
		flex-direction: column;
		border-radius: 0.45rem;
		background-color: #121212;
		overflow: scroll;
	}
</style>
