<script lang="ts">
    import {Viewport} from "#lib/viewport/viewport.svelte.ts";

    let viewport = new Viewport()
    viewport.enableGridAxis = true
    viewport.scale = 80;
    

</script>

<svg
        width={viewport.size.width}
        height={viewport.size.height}
        viewBox={`0 0 ${viewport.size.width} ${viewport.size.height}`}
>
    
    
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

<style>
    svg {
        border: 1px solid black
    }
</style>