<script lang="ts">
    import { onMount } from 'svelte';
    import type { Vector2 } from '#lib/viewport/types.ts';
    import { Viewport } from '#lib/viewport/viewport.svelte.ts'
    import { Game } from '#lib/game/game.svelte.ts';


    let viewport = new Viewport()
    viewport.enableGridAxis = true
    let targetScale: number = viewport.scale;
    
    let game = new Game();

    



    
    function handleWheel(event: WheelEvent) {
        const direction: number = event.deltaY > 0 ? -1 : 1
        console.log(direction)
        
        const sensitivity: number = 10;
        const newScale = viewport.scale + (direction * sensitivity);
        
        if(
            newScale >= 10 &&
            newScale <= 100
        ) {
            viewport.scale = newScale;
        }
    }
    
</script>

<svg
        width={viewport.size.width}
        height={viewport.size.height}
        viewBox={`0 0 ${viewport.size.width} ${viewport.size.height}`}
        on:wheel={handleWheel}
>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="Campsite tent icon">
        <path d="M27 10L37 25M37 10L27 25" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
        <path fill="currentColor" fill-rule="evenodd" d="M32 16L59 54H5L32 16ZM32 35L20 54H44L32 35Z"/>
    </svg>

    {#if viewport.enableGridAxis}
    <!-- Horizontal Axis -->
    {#each viewport.xAxisMarkings as marking}
        <line
            x1={marking.x}      
            y1={marking.y - 5}
            x2={marking.x}
            y2={marking.y + 5}
            stroke="black"
        />
    {/each}
    <line
            x1={viewport.horizontalAxis.start.x}
            y1={viewport.horizontalAxis.start.y}
            x2={viewport.horizontalAxis.end.x}
            y2={viewport.horizontalAxis.end.y}
            stroke="black"
    />

    <!-- Vertical Axis -->
    {#each viewport.yAxisMarkings as marking}
        <line
                x1={marking.x - 5}
                y1={marking.y}
                x2={marking.x + 5}
                y2={marking.y}
                stroke="black"
        />
    {/each}
    <line
            x1={viewport.verticalAxis.start.x}
            y1={viewport.verticalAxis.start.y}
            x2={viewport.verticalAxis.end.x}
            y2={viewport.verticalAxis.end.y}
            stroke="black"
    />
    {/if}
    
    <circle
    cx={viewport.size.width / 2}
    cy={viewport.size.height / 2}
    r={10}
    fill="orange"/>
</svg>
