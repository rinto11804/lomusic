<script>
    /**
     * @type {string}
     */
    export let title;
    export let img_src;
    export let artist;
</script>

<div class="song-card">
    <img src={img_src} alt={title} />
    <p id="song-title">{title}</p>
    <p id="artist-name">{artist}</p>
</div>

<style>
    .song-card {
        display: grid;
        grid-template-columns: 0.5fr 1fr 0.4fr;
        width: 100%;
        padding: 0.5rem;
        border-radius: 15px;
        background-color: #181818;
        font-size: 1.1rem;
    }
    .song-card img {
        width: 6rem;
        height: 6rem;
        object-fit: cover;
        border-radius: 10px;
        transition: all 2s ease-in-out;
    }

    .song-card:hover {
        background-color: #1e1e1e;
    }

    #song-title {
        font-size: 1.4rem;
        margin-top: 1rem;
    }
    #artist-name {
        margin-top: 0.5rem;
        font-size: 0.7rem;
    }
</style>
