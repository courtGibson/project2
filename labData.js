
 var dataP = d3.json("classData.json")


var drawLineChart = function(data)
{

  var margins =
    {
      top: 10,
      bottom: 50,
      left: 50,
      right: 50
    }


  var width = 600;
  var height = 400;
  var svg = d3.select("svg")
    .attr("width", width+margins.left+margins.right)
    .attr("height", height+margins.top+margins.bottom)


  var xScale = d3.scaleLinear()
                .domain([0,data.length])
                .range([0,width-margins.left-margins.right])

  var yScale = d3.scaleLinear()
                  .domain([0,100])
                  .range([height-margins.top-margins.bottom,0])

  var xAxis  = d3.axisBottom(xScale)

  var yAxis  = d3.axisLeft(yScale);


  svg.append("g")
         .classed(xAxis,true)
         .call(xAxis)
         .attr("transform","translate("+margins.left+","
         +(margins.top+height-margins.top-margins.bottom)+")"
      );


   svg.append("g")
     .classed(yAxis,true)
     .call(yAxis)
     .attr("transform","translate("+(margins.left)+","
     + 5 +")");


    var drawLine = d3.line()
            .x(function(d,i){return xScale(i)+margins.left;})
            .y(function(d){return yScale(d);})


    svg.append("g")
       .attr("class","line")
       .classed("hidden", false)
       .append("path")
       .datum(data)
       .attr("d", drawLine)
       .attr("fill", "none")
       .attr("stroke","steelblue")

    var drawArea = d3.area()
          .x(function(d,i){return xScale(i)+margins.left;})
          .y0(function(d){return yScale(-2);})
          .y1(function(d){return yScale(d);})

    svg.append("g")
        .attr("class","area")
        .classed("hidden", true)
        .append("path")
        .datum(data)
        .attr("fill", "steelblue")
        .attr("d", drawArea);
}

var makeButton = function()
{
  var count = 1;
   d3.select("body")
      .append("button")
      .text("Switch between line and area chart")
      .on("click", function()
      {
        if (count%2 >0)
        {
        var area = d3.select(".area")

        area.style("opacity",0)
        }
        else {
        {
          var area = d3.select(".area")

          area.style("opacity",100)
        }

      }
      count++;
      })
}


 dataP.then(function(data)
 {
   console.log("data", data)

   var avg = getClassAvg(data)
   console.log("labAvg", avg)

   drawLineChart(avg);
   makeButton();

 })
