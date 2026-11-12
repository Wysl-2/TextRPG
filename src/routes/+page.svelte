<script lang="ts">
    import { Game } from '#lib/game/game.svelte.ts';
    import WorldMap from '#lib/components/WorldMap.svelte';
    import Campsite from '#lib/components/Campsite.svelte';

    type GameView = 'map' | 'campsite';

    let game = new Game();

    let view: GameView = $state('map');

    const interval = setInterval(() => {
        game.update(1);
    }, 1000);

    function openMap() {
        view = 'map';
    }

    function openCampsite() {
        view = 'campsite';
    }
</script>

<div id="game-container">
    <div id="game-content">

        <div id="controls">
            <button onclick={openMap}>Map</button>
            <button onclick={openCampsite}>Camp</button>
        </div>

        <div id="game-view">
            {#if view === 'map'}
                <WorldMap />
            {:else if view === 'campsite'}
                <Campsite campsite={game.campsite} />
            {/if}
        </div>

    </div>
</div>

<style>

    :global(body) {
        margin: 0;
    }

    #game-container {
        display: flex;
        justify-content: center;
        min-height: 100vh;
    }

    #game-content {
        width: 100%;
        max-width: 800px;
        display: flex;
        flex-direction: column;
    }

    #controls {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        gap: 5px;
    }

    #game-view {
        width: 100%;
    }
</style>
