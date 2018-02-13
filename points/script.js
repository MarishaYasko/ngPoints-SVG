// Initialize figures types
const FIGURE_NAMES = [{name: 'circle'}, {name: 'polygon'}, {name: 'rect'}];

// Draw some points global function
function DrawPoints(options, data) {
    let figureParams = null;
    if (data.type === 'rect') {
        figureParams = {
            rx: data.figure.radius ? data.figure.radius : false,
            cords: {
                x: data.figure.cords.x,
                y: data.figure.cords.y
            }
        }
    }
    if (data.type === 'circle') {
        figureParams = {
            cx: data.figure.cx ? data.figure.cx : false,
            cy: data.figure.cy ? data.figure.cy : false,
            cords: {
                x: data.figure.cords.x,
                y: data.figure.cords.y
            },
            r: data.figure.radius
        }
    }
    if (data.type === 'polygon') {
        figureParams = {
            points: `${data.figure.points}`,
            cords: {
                x: data.figure.cords.x,
                y: data.figure.cords.y
            }
        }
    }
    const drawOptions = {
        colors: data.figure.colors,
        params: {
            figure: {
                gradient: true,
                colors: {
                    fillColor: data.figure.colors[0],
                    strokeColor: data.figure.colors[1],
                    fillRule: data.figure.fillRule ? data.figure.fillRule : null
                },
                params: figureParams,
                strokeWidth: data.figure.strokeWidth
            }
        },
        figureId: options.id
    };
    // Element drawing options
    const newSVGElement = createSvg(drawOptions.figureId, FIGURE_NAMES[1], options.svgParams);
    newSVGElement.setAttribute('width', options.svgParams.width);
    newSVGElement.setAttribute('height', options.svgParams.height);
    const figureElem = newSVGElement.children[0];
    figureElem.setAttribute('x', drawOptions.params.figure.params.cords.x);
    figureElem.setAttribute('y', drawOptions.params.figure.params.cords.y);
    drawOptions.params.figure.cords? figureElem.setAttribute('cx', drawOptions.params.figure.params.cx) : false;
    drawOptions.params.figure.cords? figureElem.setAttribute('cy', drawOptions.params.figure.params.cy) : false;
    drawOptions.params.figure.strokeWidth ? figureElem.setAttribute('stroke-width', drawOptions.params.figure.strokeWidth) : false;
    let figureStyle = drawOptions.params.figure.gradient? 'fill: url(triangle1gradient)' + ';stroke:' + drawOptions.params.figure.colors.strokeColor +
    ';stroke-width:' + drawOptions.params.figure.strokeWidth + ';' : drawOptions.params.figure.colors.fillColor +
    ';stroke:' + drawOptions.params.figure.colors.strokeColor + ';stroke-width:' + drawOptions.params.figure.strokeWidth + ';';
    figureStyle = 'fill:lime;stroke:purple;stroke-width:1';
    figureElem.setAttribute('style', figureStyle);
    drawOptions.params.figure.strokeColor ? figureElem.setAttribute('strokeColor', drawOptions.params.figure.colors.strokeColor) : false;
    drawOptions.params.figure.params.points ? figureElem.setAttribute('points', drawOptions.params.figure.params.points) : false;
    return newSVGElement;
}

// Create SVG container for figures
function createSvg(id, figureData) {
    const newSvgContainer = document.createElement('svg');
    newSvgContainer.setAttribute('id', id);
    const figure = document.createElement(figureData.name);
    newSvgContainer.appendChild(figure);
    return newSvgContainer;
}
