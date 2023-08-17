<script>
	import SongCard from "./SongCard.svelte";
	import { access_token } from "../lib/songStore";

	let isSearching = false;
	let track_name = "Reckless";
	/**
	 * @param {string} track_name
	 */
	async function SearchTrack(track_name) {
		if (track_name === "") return;
		track_name = track_name.replace("", "+");

		const { tracks } = await fetch(
			`https://api.spotify.com/v1/search?q=${track_name}&type=track`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${$access_token ?? null} `,
				},
			}
		).then((res) => res.json()).catch(err => error =err);
		return tracks.items;
	}
</script>

<h2>Search for a track</h2>
<div class="search">
	<input
		type="text"
		name="track_name"
		bind:value={track_name}
		id="track_name"
	/>
	<button on:click={() => (isSearching = true)}>🔎</button>
</div>
{#if isSearching && track_name !== "" && track_name.length > 3}
	{#await SearchTrack(track_name)}
		<p>Searching......</p>
	{:then items}
		<div class="song_wrapper">
			{#each items as item (item.id)}
				{#if item.popularity > 75 || item.album.total_tracks === 1}
					<SongCard
						title={item.name}
						img_src={item.album.images[0].url}
						artist={item.album.artists[0].name}
					/>
				{/if}
			{/each}
		</div>
	{/await}
{/if}

<style>
	.search {
		display: inline-block;
		margin: 2rem;
	}

	input {
		height: 2rem;
		border: none;
		width: 15rem;
		padding: 0.55rem;
		border-radius: 0.45rem;
	}

	button {
		height: 2rem;
		outline: none;
		border: none;
		padding: 0.45rem;
	}
	.song_wrapper {
		display: flex;
		height: fit-content;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}
</style>
