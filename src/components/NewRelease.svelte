<script>
    import { access_token } from "../lib/songStore";
    import SongCard from "./SongCard.svelte";

    let new_releases = fetch(
        "https://api.spotify.com/v1/browse/new-releases?limit=16",
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${$access_token ?? null} `,
            },
        }
    ).then((res) => res.json());
</script>

{#await new_releases}
    <p>Loading.....</p>
{:then data}
    <h2>New Releases</h2>
    <div class="song-card-wrapper">
        {#each data.albums.items as item (item.id)}
            <SongCard
                title={item.name}
                img_src={item.images[1].url}
                artist={item.artists[0].name}
            />
        {/each}
    </div>
    <p>Show more</p>
{/await}

<style>
    h2 {
        margin: 0.04rem 0 0.5rem;
        font-size: 6rem;
    }
</style>
