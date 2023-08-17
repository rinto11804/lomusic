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
    <p>{title}</p>
    <p>{artist}</p>
</div>

<style>
    .song-card {
        width: 15rem;
        height: 20rem;
        margin: 1rem;
        padding: 0.5rem;
        border-radius: 15px;
        background-color: #181818;
        font-size: 1.1rem;
    }
    .song-card img {
        width: 14rem;
        height: 13rem;
        object-fit: cover;
        border-radius: 10px;
    }
</style>
