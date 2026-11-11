import type { Vector2, Range, Size2D, Axis } from '#lib/viewport/types.ts';

type Line2D = {
    start: Vector2;
    end: Vector2;
};

export class Viewport {
    size: Size2D = $state({width: 800, height: 800});
    viewcenter: Vector2 = $state({x: 0, y: 0});
    scale: number = $state(40);
    
    enableGridAxis = true;
    
    center: Vector2 = $derived({
        x: this.size.width / 2,
        y: this.size.height / 2
    });

    xRange: Range = $derived({
        min: this.viewcenter.x - this.size.width/(2 * this.scale),
        max: this.viewcenter.x + this.size.width/(2 * this.scale)
    })

    yRange: Range = $derived({
        min: this.viewcenter.y - this.size.height / (2 * this.scale),
        max: this.viewcenter.y + this.size.height / (2 * this.scale)
    })

    svgOrigin: Vector2 = $derived({
        x: this.center.x - this.viewcenter.x * this.scale,
        y: this.center.y + this.viewcenter.y * this.scale
    })

    xAxisMarkings: Vector2[] = $derived(this.createAxisMarkings("x"));
    yAxisMarkings: Vector2[] = $derived(this.createAxisMarkings("y"));

    createAxisMarkings(axis: Axis): Vector2[]
    {
        const range: Range = axis == "x" ? this.xRange : this.yRange
        const markings: Vector2[] = [];
        for(let i = Math.ceil(range.min); i <= range.max; i++)
        {
            if(i === 0)
                continue;
            const point: Vector2 = axis === "x"
                ? { x: i, y: 0 }
                : { x: 0, y: i };
            markings.push(this.graphToViewport(point));
        }
        return markings;
    }

    readonly horizontalAxis: Line2D = $derived({
        start: { x: 0, y: this.svgOrigin.y },
        end: { x: this.size.width, y: this.svgOrigin.y }
    });

    readonly verticalAxis: Line2D = $derived({
        start: { x: this.svgOrigin.x, y: 0 },
        end: { x: this.svgOrigin.x, y: this.size.height }
    });

    graphToViewport(point: Vector2): Vector2 {
        const x = this.center.x + (point.x - this.viewcenter.x) * this.scale;
        const y = this.center.y - (point.y - this.viewcenter.y) * this.scale;

        return { x, y };
    }

    viewportToGraph(svgPoint: Vector2): Vector2 {
        const x = ((svgPoint.x - this.center.x) / this.scale) + this.viewcenter.x;
        const y = ((this.center.y - svgPoint.y) / this.scale) + this.viewcenter.y;

        return { x, y };
    }
    
    

}