document.addEventListener('DOMContentLoaded', function () {
    const data = [
        { category: 'Current', incoming: 100, output: 90, damaged: 10 },
        { category: 'previous month ', incoming: 80, output: 30, damaged: 5 },
        { category: 'before month', incoming: 85, output: 75, damaged: 6 },
        { category: 'last month', incoming: 90, output: 80, damaged: 7 }
    ];

    const width =700;
    const height = 500;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    const createSvg = (classname) => d3.select(`.${classname}`)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height]);

    const svgIncoming = createSvg('one');
    const svgOutput = createSvg('two');
    const svgDamaged = createSvg('three');

    const x = d3.scaleBand()
        .domain(data.map(d => d.category))
        .range([margin.left, width - margin.right])
        .padding(0.1);

    const y = (key) => d3.scaleLinear()
        .domain([0, d3.max(data, d => d[key])])
        .nice()
        .range([height - margin.bottom, margin.top]);

    const line = d3.line()
        .x(d => x(d.category) + x.bandwidth() / 2)
        .y((d, yScale, key) => yScale(d[key]));

    const drawGraph = (svg, yScale, key, color, title) => {
        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', color)
            .attr('stroke-width', 1.5)
            .attr('d', d3.line()
                .x(d => x(d.category) + x.bandwidth() / 2)
                .y(d => yScale(d[key]))
            );

        svg.selectAll('.dot')
            .data(data)
            .enter().append('circle')
            .attr('class', 'dot')
            .attr('cx', d => x(d.category) + x.bandwidth() / 2)
            .attr('cy', d => yScale(d[key]))
            .attr('r', 3)
            .attr('fill', color);

        svg.append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x));

        svg.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale));

        svg.append('text')
            .attr('x', width / 2)
            .attr('y', margin.top / 2)
            .attr('text-anchor', 'middle')
            .style('font-size', '16px')
            .style('text-decoration', 'underline')
            .text(title);
    };

    drawGraph(svgIncoming, y('incoming'), 'incoming', 'steelblue', 'Incoming Analytics');
    drawGraph(svgOutput, y('output'), 'output', 'green', 'Output Analytics');
    drawGraph(svgDamaged, y('damaged'), 'damaged', 'red', 'Damaged Analytics');
});
document.addEventListener('DOMContentLoaded', function () {
    const data = [
        { category: 'Current', incoming: 100, output: 90, damaged: 10 },
        { category: 'Prev1', incoming: 80, output: 30, damaged: 5 },
        { category: 'Prev2', incoming: 85, output: 75, damaged: 6 },
        { category: 'Prev3', incoming: 90, output: 80, damaged: 7 }
    ];

    const width = 700;
    const height = 500;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    const svg = d3.select('#compare')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height]);

    const x = d3.scaleBand()
        .domain(data.map(d => d.category))
        .range([margin.left, width - margin.right])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => Math.max(d.incoming, d.output, d.damaged))])
        .nice()
        .range([height - margin.bottom, margin.top]);

    const line = d3.line()
        .x(d => x(d.category) + x.bandwidth() / 2)
        .y(d => y(d.incoming));

    const drawLine = (key, color, title) => {
        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', color)
            .attr('stroke-width', 1.5)
            .attr('d', d3.line()
                .x(d => x(d.category) + x.bandwidth() / 2)
                .y(d => y(d[key]))
            );

        svg.selectAll(`.dot.${key}`)
            .data(data)
            .enter().append('circle')
            .attr('class', `dot ${key}`)
            .attr('cx', d => x(d.category) + x.bandwidth() / 2)
            .attr('cy', d => y(d[key]))
            .attr('r', 3)
            .attr('fill', color);

        svg.append('text')
            .attr('x', width / 2)
            .attr('y', margin.top / 2)
            .attr('text-anchor', 'middle')
            .style('font-size', '16px')
            .style('text-decoration', 'underline')
            .text(title);
    };

    drawLine('incoming', 'steelblue', 'Combined Analytics');
    drawLine('output', 'green', 'Combined Analytics');
    drawLine('damaged', 'red', 'Combined Analytics');

    svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));

    svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));
});




let btn2 = document.getElementById('btn1');
let btn3 = document.getElementById('btn2');
let btn4 = document.getElementById('btn3');
let btn5 = document.getElementById('btn4');
let indiv1 = document.getElementById('onediv')
let outdiv2 = document.getElementById('twodiv')
let damdiv3 = document.getElementById('threediv')
let comdiv4 = document.getElementById('compare')

const incoming = document.getElementById('btn1').addEventListener("click", function() {
     outdiv2.style.display='none'
     damdiv3.style.display='none' 
     comdiv4.style.display='none'
     indiv1.style.display='block'    
});
const outgoing= document.getElementById('btn2').addEventListener("click", function() {
    indiv1.style.display='none'
    damdiv3.style.display='none'
    outdiv2.style.display='block'
    comdiv4.style.display='none'    
});
const damaged = document.getElementById('btn3').addEventListener("click", function() {
    indiv1.style.display='none'
    outdiv2.style.display='none'
    damdiv3.style.display='block'
    comdiv4.style.display='none'    
});
const compare = document.getElementById('btn4').addEventListener("click", function() {
    indiv1.style.display='none'
    outdiv2.style.display='none'
    damdiv3.style.display='none'
    comdiv4.style.display='block'    
});