var classDataP = d3.json("classData.json");

var drawChart = function(data, svg, margins, yScale, xScale)
{
  var drawLine = d3.line()
          .x(function(d,i){return xScale(i)+margins.left;})
          .y(function(d){return yScale(d);})


  var penguinList = getPenguins(data);



  //var lineData = penguinList.forEach(function(d, i) {return getCummulative(data[i]);})
  //console.log("line data", lineData)

  /*svg.selectAll("g")
     .data()
     .append("g")
     .attr("class","line")
     .classed("hidden", false)
     .append("path")
     .datum(function(d,i) {return d[i]; })
     .attr("d", drawLine)
     .attr("fill", "none")
     .attr("stroke","steelblue")*/
}

var getPictures = function(data)
{
  var pictures = data.map(function(d,i){return d.picture;})
  return pictures;
}


var makePenguinButtons = function(data)
{
  var pictures = getPictures(data);
  //console.log("picture", pictures)

  d3.select("body")
     .selectAll("img")
     .data(pictures)
     .enter()
     .append("img")
     .attr("xlink:href",function(d,i){return d;})
     .attr("width","50")
     .attr("height", "50")
}



classDataP.then(function(data)
{
  console.log("new .js data", data)
  var margins =
    {
      top: 10,
      bottom: 50,
      left: 50,
      right: 50
    }

  var screen =
  {
    widths: 800,
    heights: 400
  }

  var width = screen.widths+margins.left+margins.right;
  var height = screen.heights+margins.top+margins.bottom;

  var classSVG = d3.select("#graph1")
    .attr("width", width)
    .attr("height", height)



  var xScale = d3.scaleLinear()
                .domain([0,41])
                .range([0, screen.widths])

  var yScale = d3.scaleLinear()
                  .domain([0,100])
                  .range([screen.heights,0])

  var xAxis  = d3.axisBottom(xScale)

  var yAxis  = d3.axisLeft(yScale);


  classSVG.append("g")
         .classed(xAxis,true)
         .call(xAxis)
         .attr("transform","translate("+margins.left+","
         +(margins.top+height-margins.top-margins.bottom)+")"
      );


   classSVG.append("g")
     .classed(yAxis,true)
     .call(yAxis)
     .attr("transform","translate("+(margins.left)+","
     + 5 +")");


     var svg2 = d3.select("#graph2")
       .attr("width", width)
       .attr("height", height)



       svg2.append("g")
              .classed(xAxis,true)
              .call(xAxis)
              .attr("transform","translate("+margins.left+","
              +(margins.top+height-margins.top-margins.bottom)+")"
           );


        svg2.append("g")
          .classed(yAxis,true)
          .call(yAxis)
          .attr("transform","translate("+(margins.left)+","
          + 5 +")");



  makePenguinButtons(data)
  drawChart(data, classSVG, margins, yScale, xScale)

},
  function(err)
{
  console.log(err);
});
