<script>
    import { genres } from "../assets/constant.js";
    import { access_token } from "../lib/songStore.js";
    import SongCard from "./SongCard.svelte";

    let recommendation = null;

    /**
     * @type {string}
     */
    let selected_geners;

    async function getRecommendation(geners) {
        recommendation = fetch(
            `https://api.spotify.com/v1/recommendations?limit=16&market=IN&seed_genres=${geners}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${$access_token} `,
                },
            }
        ).then((res) => res.json());
    }
</script>

<header class="discover">
        <h2>Discover</h2>
        <select
            name="genres"
            id="genres"
            bind:value={selected_geners}
            on:change={() => getRecommendation(selected_geners.toLowerCase())}
        >
            {#each genres as genre}
                <option value={genre.title}>{genre.title}</option>
            {/each}
        </select>
    {#if recommendation}
        {#await recommendation}
            <p>Loading.....</p>
        {:then data}
            <div class="song-card-wrapper">
                {#each data.tracks as item, i (item.id)}
                    {#if i < 12}
                        <SongCard
                            title={item.album.name}
                            img_src={item.album.images[1].url}
                            artist={item.album.artists[0].name}
                        />
                    {/if}
                {/each}
            </div>
            <p>Show more</p>
        {/await}
    {/if}
</header>

<style>
    .discover{
        width:100%;
    }
    :global(.song-card-wrapper) {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    h2 {
        font-size: 4rem;
        margin-block:1rem;
    }
    select {
        background-color: hsl(0, 0%, 10%);
        outline: none;
        border: none;
        width: 7rem;
        height: 2rem;
        border-radius: 0.35rem;
        text-align: center;
        margin-block:1rem;
    }
</style>
