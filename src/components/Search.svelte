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
		).then((res) => res.json());
		return tracks.items;
	}
</script>

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
		display: flex;
		align-items: center;
		gap: 0.5rem;
		justify-content: baseline;
		margin: 2rem;
	}

	input {
		border: none;
		background-color: #242424;
		border-radius: 0.4rem;
		color: #fff !important;
		height: 48px;
		padding: 3px 36px;
		text-overflow: ellipsis;
		font-size: 1.1rem;
	}

	input:focus {
		outline: 2px solid whitesmoke;
	}

	button {
		height: 45px;
		outline: none;
		border: none;
		padding-inline:1rem;
		transform: rotateY(180deg);
	}
	.song_wrapper {
		display: flex;
		height: fit-content;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
	}
</style>
