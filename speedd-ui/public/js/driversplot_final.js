﻿var speed = 100;

var img, img2;

var distance = [2,3,3,5];


function drawDrivers() {
    var margin = { top: 20, right: 15, bottom: 60, left: 60 }
  , width = parseInt(d3.select('#svg2').style('width')) - margin.left - margin.right
  , height = parseInt(d3.select('#svg2').style('height')) - margin.top - margin.bottom;
    console.log(height);

    // sets up the scales
    /*    var x = d3.scale.linear()
              .domain([0, 100])
              .range([0, width]);*/
    var y = d3.scale.linear()
          .domain([0, 350])
          .range([height, 0]);

    var svg = d3.select('#driversGraph').select("#svg2")
            .attr('width', width + margin.right + margin.left)
            .attr('height', height + margin.top + margin.bottom)
            .attr('class', 'chart');

    var g = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'main');

    // draws the y axis and appends it to chart
    var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');

    g.append('g')
            .attr('transform', 'translate(0,0)')
            .attr('class', 'y axis')
            .call(yAxis)
        .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Speed");

    // DRAW speed indicator (horizontal line)
    var linePoints = [[{ x: 0, y: speed }, { x: width / 4, y: speed }]];

    var line = d3.svg.line()
        .interpolate("basis")
        .x(function (d) { return (d.x); })
        .y(function (d) { return y(d.y); });

    g.selectAll(".line")
        .data(linePoints)
      .enter().append("path")
        .attr("class", "line")
        .attr("d", line)
        .style('stroke', 'black')
        .style('stroke-width', 4);

    // add the car image to the svg
    img = g.append("svg:image")
        .attr("xlink:href", "img/2d_car_lightgrey_s.png")
        .attr("width", 50)
        .attr("height", 100)
        .attr("x", width / 2 - 35)
        .attr("y", height / 3);

    img2 = g.append("svg:image")
        .attr("xlink:href", "img/2d_car_lightgrey.png")
        .attr("width", 50)
        .attr("height", 100)
        .attr("x", width / 2 + 35 )
        .attr("y", height / 3);
        
    // add distance indicators
    var color = d3.scale.linear()
          .domain([11, 0])
          .range(['green', 'red'])

    var dist = g.selectAll('rect').data(distance)
            .enter().append('rect')
                .attr('x', function (d, i) { if (i == 0 || i == 1) return width / 2 + 35; else return width / 2 - 35; })
                .attr('y', function (d, i) { if (i == 0 || i == 1) return (height / 3 - 5) - d * 7; else return (height / 3 + 105); })
                .attr('width', function (d, i) { if (i == 1 || i == 3) return 30; else return 50 })
                .attr('height', function (d) { return d * 7 })
                .style('fill', function (d, i) { if (i == 1 || i == 3) return "steelblue"; else return color(d) });
    /*                .append('text')
                        .attr('dx', -20)
                        .text(function (d) { return d });
            */


//    d3.select(window).on('resize', redrawDrivers);
}

function redrawDrivers() {
    var margin = { top: 20, right: 15, bottom: 60, left: 60 }
  , width = parseInt(d3.select('#svg2').style('width')) - margin.left - margin.right
  , height = parseInt(d3.select('#svg2').style('height')) - margin.top - margin.bottom;
    console.log(height);

    // sets up the scales
    /*    var x = d3.scale.linear()
              .domain([0, 100])
              .range([0, width]);*/
    var y = d3.scale.linear()
          .domain([0, 350])
          .range([height, 0]);

    var svg = d3.select('#driversGraph').select("#svg2")
            .attr('width', width + margin.right + margin.left)
            .attr('height', height + margin.top + margin.bottom)
            .attr('class', 'chart');

    var linePoints = [[{ x: 0, y: speed }, { x: width / 4, y: speed }]];

    var line = d3.svg.line()
        .interpolate("basis")
        .x(function (d) { return (d.x); })
        .y(function (d) { return y(d.y); });

    var g = svg.selectAll('g');

    // draws the y axis and appends it to chart
    var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');
    g.selectAll("g.y.axis").call(yAxis);

    // UPDATE LINE (speed indicator)
    g.selectAll(".line")
        .data(linePoints).transition().duration(700)
            .attr("class", "line")
            .attr("d", line)
            .style('stroke', 'black')
            .style('stroke-width', 4);
    // update car image
    img.attr("x", width / 2 - 35)
       .attr("y", height / 3);

    img2.attr("x", width / 2 + 35)
        .attr("y", height / 3);

    //update distance indicators (rectangles)
    var color = d3.scale.linear()
          .domain([11, 0])
          .range(['green', 'red'])

    var dist = g.selectAll('rect').data(distance)
        .transition().duration(700)
                .attr('x', function (d, i) { if (i == 0 || i == 1) return width / 2 + 35; else return width / 2 - 35; })
                .attr('y', function (d, i) { if (i == 0 || i == 1) return (height / 3 - 5) - d * 7; else return (height / 3 + 105); })
                .attr('width', function (d, i) { if (i == 1 || i == 3) return 30; else return 50 })
                .attr('height', function (d) { return d * 7 })
                .style('fill', function (d, i) { if (i == 1 || i == 3) return "steelblue"; else return color(d) });

}

function updateGraphs()
{
    redraw();
    redrawDrivers();
    redrawRampMetering();
}

function drawSuggestions()
{
    var margin = { top: 20, right: 15, bottom: 60, left: 60 }
 , width = parseInt(d3.select('#svgs').style('width')) - margin.left - margin.right
 , height = parseInt(d3.select('#svgs').style('height')) - margin.top - margin.bottom;
   

    var color = d3.scale.linear()
          .domain([100, 0])
          .range(['green', 'red'])

    var svg = d3.select("#svgs")
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom);

    var g = svg.append('g');

    var s1 = g.append("text").attr("id","s1")
//        .style("font-size", 22)
        .text("1. Reduce the speed to 70 km/h")
        .attr("x", 0)
        .attr("y", 40);
    
    var s2 = g.append("text").attr("id","s2")
        .text("2. Change ramp metering rate at J11")
        .attr("x", 0)
        .attr("y", 80);

    var s3 = g.append("text").attr("id","s3")
        .text("3. Set message to: Beware, Accident Ahead! ")
        .attr("x", 0)
        .attr("y", 120);

    var c = g.append("text")
        .text("Confidence Level")
        .attr("x", 0)
        .attr("y", 180);

    var clevel = g.append("rect").attr("id",clevel)
        .attr("x", 150)
        .attr("y", 165)
        .attr("height", 25)
        .attr("width", 60)
        .style("fill", function () { return color(93) });

    var clabel = g.append("text")
        .text("93%")
        .attr("x", 180)
        .attr("y", 180)
}

// suggestions is an array of 3 strings
function updateSuggestions(suggestions)
{
	d3.select("#s1").text("1. "+suggestions[0]);
	d3.select("#s2").text("2. "+suggestions[1]);
	d3.select("#s3").text("3. "+suggestions[2]);
}
