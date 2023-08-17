<script>
	// import Discover from "./components/Discover.svelte";
	// import NewRelease from "./components/NewRelease.svelte";
	import { getAccessToken } from "./lib/songStore";

    import Search from "./components/Search.svelte";

</script>

<main>
	{#await getAccessToken() then _}
	<!-- <NewRelease /> -->
	<!-- <Discover /> -->

	<Search/>
	{/await}


</main>

<style>
	main {
		display: flex;
		align-items: center;
		flex-direction: column;
	}
</style>
