<script>
	import Discover from "./components/Discover.svelte";
	import NewRelease from "./components/NewRelease.svelte";
	import { getAccessToken } from "./lib/songStore";
</script>

<main>
	{#await getAccessToken() then _}
		<NewRelease />
		<Discover />
	{/await}
</main>

<style>
	main {
		display: flex;
		align-items: center;
		flex-direction: column;
	}
</style>
