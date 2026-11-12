<script lang="ts">
    import type { Campsite } from '#lib/game/types.ts';

    let { campsite }: { campsite: Campsite } = $props();
    
    function toggleFire() {
        campsite.fire.status = campsite.fire.status === 'lit' ? 'extinguished' : 'lit';
    }
</script>

<div id="campsite-panel">

    <header>
        <h1>Campsite</h1>
        <p>{campsite.status}</p>
    </header>

    <div id="campsite-modules">

        <!-- Storage Module -->
        <section class="module">
            <h2>Storage</h2>

            <ul class="item-list">
                {#each Object.entries(campsite.storage) as [resource, quantity] (resource)}
                    <li class="item">
                        <span>{resource}</span>
                        <span>{quantity}</span>
                    </li>
                {/each}
            </ul>
        </section>

        <!-- Campfire Module -->
        <section class="module">
            <h2>Campfire</h2>

            <div class="module-content">
                <p>Status: {campsite.fire.status}</p>

                <div>
                    <label for="fire-fuel">Fuel</label>

                    <progress
                            id="fire-fuel"
                            value={campsite.fire.fuel}
                            max={campsite.fire.maxFuel}
                    ></progress>

                    <span>
                        {campsite.fire.fuel} / {campsite.fire.maxFuel}
                    </span>
                </div>

                <p>Burn rate: {campsite.fire.burnRate} / sec</p>
            </div>

            <button
                    onclick={toggleFire}
                    disabled={campsite.fire.fuel <= 0 && campsite.fire.status !== 'lit'}
            >
                {campsite.fire.status === 'lit' ? 'Extinguish Fire' : 'Light Fire'}
            </button>
        </section>

    </div>
</div>

<style>
    #campsite-panel {
        padding: 20px;
    }

    #campsite-modules {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
    }

    .module {
        display: flex;
        flex-direction: column;

        padding: 16px;
        gap: 12px;

        border: 1px solid #555;
        border-radius: 8px;
        background: darkgrey;
    }

    .module h2 {
        margin: 0;
        padding-bottom: 8px;

        border-bottom: 1px solid #555;

        font-size: 1.1rem;
    }

    .module-content {
        flex: 1;
    }
</style>