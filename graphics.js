var classDataP = d3.json("classData.json");

var drawChart = function(data, svg, svg2, svg3, margins, yScale, xScale, colors)
{
  var drawLine = d3.line()
          .x(function(d,i){return xScale(i)+margins.left;})
          .y(function(d){return yScale(d);})


  var penguinList = getPenguins(data);
  //console.log("pList", penguinList)
  //console.log(getCummulative(penguinList[0]))

  var lineData = []
  penguinList.forEach(function(d) {return lineData.push(getCummulative(d));})
  //console.log("line data", lineData)

  var drawArea1 = d3.area()
        .x(function(d,i){return xScale(i*1.82)+margins.left+2;})
        .y0(function(d){return yScale(78);})
        .y1(function(d){return yScale(98);})

  svg.append("g")
      .attr("class","area")
      .classed("hidden", false)
      .append("path")
      .datum(data)
      .attr("fill", "springgreen")
      .style("opacity", 1)
      .attr("d", drawArea1);


    var drawArea2 = d3.area()
          .x(function(d,i){return xScale(i*1.82)+margins.left+2;})
          .y0(function(d){return yScale(58);})
          .y1(function(d){return yScale(78);})

   svg.append("g")
      .attr("class","area")
      .classed("hidden", false)
      .append("path")
      .datum(data)
      .attr("fill", "khaki")
      .style("opacity", 1)
      .attr("d", drawArea2);



  var drawArea3 = d3.area()
        .x(function(d,i){return xScale(i*1.82)+margins.left+2;})
        .y0(function(d){return yScale(0);})
        .y1(function(d){return yScale(58);})

    svg.append("g")
        .attr("class","area")
        .classed("hidden", false)
        .append("path")
        .datum(data)
        .attr("fill", "salmon")
        .style("opacity", 1 )
        .attr("d", drawArea3);



  lineData.forEach(function(d,i)
  {
    return svg.append("g")
     .attr("class","line")
     .attr("id", data[i].picture.split("-300px.png")[0]+"line")
     .classed("hidden", false)
     .append("path")
     .datum(d)
     .attr("d", drawLine)
     .attr("fill", "none")
     .attr("stroke",function(d,i){return "blue"})
     .attr("stroke-width",2)
     .style("opacity",0.8)
     .on("mouseover", function(d){

       //console.log("picture", data[i].picture)
       var currPicture = data[i].picture.split(".png")[0]
       var picID = "#"+currPicture;

       d3.select(picID)
          .style("transform", "scale(1.4,1.4)")
          .style("transform-origin", "50% 50%");

       d3.select(this)
         .attr("stroke-width", 5)
         //console.log("ID of line", )



     })

    .on("mouseout", function(d){

       //console.log("picture", data[i].picture)
       var currPicture = data[i].picture.split(".png")[0]
       var picID = "#"+currPicture;

       d3.select(picID)
          .style("transform", "scale(1,1)")
          .style("transform-origin", "50% 50%");

       d3.select(this)
         .attr("stroke-width", 2)



     })
     .on("click", function(d){

       console.log("picture", data[i].picture)
       var currPicture = data[i].picture
       var picID = "#"+currPicture.split("-300px.png")[0];

       d3.select(picID)
          .style("transform", "scale(1.4,1.4)")
          .style("transform-origin", "50% 50%");
     })

   })



   svg.append("g")
    .attr("class","line")
    .classed("hidden", false)
    .attr("id", "classAvg")
    .append("path")
    .datum(getClassAvg(data))
    .attr("d", drawLine)
    .attr("fill", "none")
    .attr("stroke",function(d,i){return "red"})
    .attr("stroke-width",2)
    //.attr("lineDashType", "dash")
}

/*var drawChart3 = function(data, pengPic, svg, margins, yScale, xScale, colors, height, width, heights, widths)
{

  var xScale = d3.scaleLinear()
                .domain([0,41])
                .range([0, screen.widths])

  var yScale = d3.scaleLinear()
                  .domain([-50,50])
                  .range([screen.heights,0])

  var xAxis  = d3.axisBottom(xScale);

  var yAxis  = d3.axisLeft(yScale);


  svg.append("g")
         .classed("xAxis",true)
         .call(xAxis)
         .attr("transform","translate("+margins.left+","
         +(margins.top+height-margins.top-margins.bottom)+")"
      );


   svg.append("g")
     .classed("yAxis",true)
     .call(yAxis)
     .attr("transform","translate("+(margins.left)+","
     + 5 +")");

  var penguins = getPenguins(data);
  var penguinFound = false;
  var index = 0;
  var currPeng = "";

  while (penguinFound == false && index<penguins.length)
  {
    console.log(pengPic, penguins[index].picture)

    if (penguins[index].picture == pengPic)
    {
      penguinFound = true;
      currPeng = penguins[index];
      console.log("currPeng1", currPeng)
    }
    index++;
    if (index == penguins.length)
    {
      console.log("not found")
    }
  }

 var diff = getDiff(data, currPeng)


  console.log("diff",diff)

  var drawLine = d3.line()
          .x(function(d,i){return xScale(i)+margins.left;})
          .y(function(d,i){return yScale(d);})


  var penguinList = getPenguins(data);
//  console.log("pList", penguinList)
  //console.log(getCummulative(penguinList[0]))

  //var lineData = []
//  penguinList.forEach(function(d) {return lineData.push(getCummulative(d));})
  //console.log("line data", lineData)




    svg.append("g")
     .attr("class","line")
     .attr("id", pengPic.split("-300px.png")[0]+"diff")
     .classed("hidden", false)
     .append("path")
     .datum(diff)
     .attr("d", drawLine)
     .attr("fill", "none")
     .attr("stroke",function(d,i){return "blue"})
     .attr("stroke-width",2)
     .style("opacity",0.8)


}*/

var getPictures = function(data)
{
  var pictures = data.map(function(d,i){return d.picture;})
  return pictures;
}


var makePenguinButtons = function(data, svg2, svg3, margins, yScale, xScale, colors,  height, width, heights, widths)
{
  var pictures = getPictures(data);
  //console.log("picture", pictures)

 var count = 0;

  d3.select("body")
     .selectAll("img")
     .data(pictures)
     .enter()
     .append("img")
     .attr("id", function(d){return d.split("-300px.png")[0];})
     .attr("src",function(d,i){return d;})
     .attr("width","60")
     .attr("height", "70")
     .on("mouseover", function(d,i){
       //console.log("picture", data[i].picture)
       var currPicture = data[i].picture.split("-300px.png")[0];
       //console.log("pic name", currPicture)
       var lineID = "#"+currPicture+"line";


//console.log("lineID", lineID)

      d3.select(lineID)
        .attr("stroke-width", 5)

       d3.select(this)
         .style("transform", "scale(1.2,1.2)")
         .style("transform-origin", "50% 50%");

     })
     .on("mouseout", function(d,i){

       //console.log("picture", data[i].picture)
       var currPicture = data[i].picture.split("-300px.png")[0]
       var lineID = "#"+currPicture+"line";

       d3.select(lineID)
         .attr("stroke-width", 2)

       d3.select(this)
         .style("transform", "scale(1,1)")
         .style("transform-origin", "50% 50%");


     })
     .on("click", function(d,i) {

       var id = "#"+d.split("-300px.png")[0]+"line";
       draw(data[i].picture, data, svg2, margins, yScale, xScale, colors);
       //drawChart3(data, data[i].picture, svg3, margins, yScale, xScale, colors,  height, width, heights, widths);
      if(count%2==0)
      {
        var lines = d3.selectAll(".line")
                       .style("opacity",0)


         d3.select(id)
            .style("opacity",1)

        d3.select("#classAvg")
        .style("opacity",1)


      }
      else {
        var lines = d3.selectAll(".line")
                       .style("opacity",1)
      }

     count++;

     drawCircle2(data, data[i].picture, svg3, margins, yScale, xScale, colors,  height, width, heights, widths)

     })
}

var drawCircle2 = function(data, pengPic, svg, margins, yScale, xScale, colors,  height, width, heights, widths)
{
  var penguins = getPenguins(data);
  var penguinFound = false;
  var index = 0;
  var currPeng = "";


  while (penguinFound == false && index<penguins.length)
  {
    console.log(pengPic, penguins[index].picture)

    if (penguins[index].picture == pengPic)
    {
      penguinFound = true;
      currPeng = penguins[index];
      console.log("currPeng1", currPeng)
    }
    index++;
    if (index == penguins.length)
    {
      console.log("not found")
    }
  }

  var currData = getCummulative(currPeng);


  svg.selectAll("circle")
       .data(currData)
       .enter()
       .append("circle")
       .attr("r", 5)
       .attr("cx", function(d, i) { return xScale(i); })
       .attr("cy", function(d) { return yScale(d); })
       .on("mouseover", function(d) {
           div.transition()
               .duration(200)
               .style("opacity", .9);
           div	.html(formatTime(d.date) + "<br/>"  + d.close)
               .style("left", (d3.event.pageX) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
           })
       .on("mouseout", function(d) {
           div.transition()
               .duration(500)
               .style("opacity", 0);
       });

}

var drawChart2 = function(currPeng, data, svg, currData, margins, yScale, xScale, colors)
{

    d3.select("#graph2").selectAll("*").remove();

  var xAxis  = d3.axisBottom(xScale)

  var yAxis  = d3.axisLeft(yScale);

//console.log(xAxis)
  svg.append("g")
         .classed("xAxis",true)
         .call(xAxis)
         .attr("transform","translate("+margins.left+","
         +(margins.top+500-margins.top-margins.bottom+58)+")"
      );


   svg.append("g")
     .classed("yAxis",true)
     .call(yAxis)
     .attr("transform","translate("+(margins.left)+","
     + 5 +")");



  var drawLine = d3.line()
          .x(function(d,i){return xScale(i)+margins.left;})
          .y(function(d){return yScale(d);})

  var drawArea1 = d3.area()
        .x(function(d,i){return xScale(i*1.82)+margins.left+2;})
        .y0(function(d){return yScale(78);})
        .y1(function(d){return yScale(98);})

  svg.append("g")
      .attr("class","area")
      .classed("hidden", false)
      .append("path")
      .datum(data)
      .attr("fill", "springgreen")
      .style("opacity", 1)
      .attr("d", drawArea1);


    var drawArea2 = d3.area()
          .x(function(d,i){return xScale(i*1.82)+margins.left+2;})
          .y0(function(d){return yScale(58);})
          .y1(function(d){return yScale(78);})

   svg.append("g")
      .attr("class","area")
      .classed("hidden", false)
      .append("path")
      .datum(data)
      .attr("fill", "khaki")
      .style("opacity", 1)
      .attr("d", drawArea2);



  var drawArea3 = d3.area()
        .x(function(d,i){return xScale(i*1.82)+margins.left+2;})
        .y0(function(d){return yScale(0);})
        .y1(function(d){return yScale(58);})

    svg.append("g")
        .attr("class","area")
        .classed("hidden", false)
        .append("path")
        .datum(data)
        .attr("fill", "salmon")
        .style("opacity", 1 )
        .attr("d", drawArea3);
//console.log("currPeng", currPeng)

//console.log("cummData", cummData)

    svg.append("g")
     .attr("class","line")
     .attr("id", currPeng.picture.split("-300px.png")+"line")
     .classed("hidden", false)
     .append("path")
     .datum(currData)
     .attr("d", drawLine)
     .attr("fill", "none")
     .attr("stroke",function(d,i){return "blue"})
     .attr("stroke-width",2)
     .style("opacity",0.8)
}


var draw = function(penguinPic, data, svg, margins, yScale, xScale, colors)
{
  var penguins = getPenguins(data);
  var penguinFound = false;
  var index = 0;
  var currPeng = "";

  while (penguinFound == false && index<penguins.length)
  {
    //console.log(penguinPic, penguins[index].picture)

    if (penguins[index].picture == penguinPic)
    {
      penguinFound = true;
      currPeng = penguins[index];
      //console.log("currPeng1", currPeng)
    }
    index++;
    if (index == penguins.length)
    {
      console.log("not found")
    }
  }
  //console.log("not found")
drawChart2(currPeng, data, svg, getCummulative(currPeng), margins, yScale, xScale, colors)

  var avgHW = getAverages(getGrades(currPeng, currPeng.homework))
  avgHW.forEach(function(d, i){if(d==-1){avgHW[i]=1;} avgHW[i]=d*100;})
  var avgQuiz = getAverages(getGrades(currPeng, currPeng.quizes))
  avgQuiz.forEach(function(d, i){avgQuiz[i]=d*100;})
  var avgTest = getAverages(getGrades(currPeng, currPeng.test))
  avgTest.forEach(function(d, i){avgTest[i]=d*100;})
  var avgFinal = getAverages(getGrades(currPeng, currPeng.final))
  avgFinal.forEach(function(d, i){avgFinal[i]=d*100;})
//console.log("currPeng1", currPeng)
  d3.select("#cummulative")
    .on("click", function(d,i){
      drawChart2(currPeng, data, svg, getCummulative(currPeng), margins, yScale, xScale, colors)
    })

    d3.select("#homework")
      .on("click", function(d,i){
        drawChart2(currPeng, data, svg, avgHW, margins, yScale, xScale, colors)
      })


      d3.select("#final")
        .on("click", function(d,i){
          drawCircle(currPeng, data, svg, avgFinal, margins, yScale, xScale, colors)
        })

    d3.select("#test")
      .on("click", function(d,i){
      drawChart2(currPeng, data, svg, avgTest, margins, yScale, xScale, colors)
    })

    d3.select("#quiz")
      .on("click", function(d,i){
      drawChart2(currPeng, data, svg, avgQuiz, margins, yScale, xScale, colors)
    })


}


var drawCircle = function(currPeng, data, svg, currData, margins, yScale, xScale, colors)
{

      d3.select("#graph2").selectAll("*").remove();

    var xAxis  = d3.axisBottom(xScale)

    var yAxis  = d3.axisLeft(yScale);

  //console.log(xAxis)
    svg.append("g")
           .classed("xAxis",true)
           .call(xAxis)
           .attr("transform","translate("+margins.left+","
           +(margins.top+500-margins.top-margins.bottom+58)+")"
        );


     svg.append("g")
       .classed("yAxis",true)
       .call(yAxis)
       .attr("transform","translate("+(margins.left)+","
       + 5 +")");



    var drawArea1 = d3.area()
          .x(function(d,i){return xScale(i*1.82)+margins.left+2;})
          .y0(function(d){return yScale(78);})
          .y1(function(d){return yScale(98);})

    svg.append("g")
        .attr("class","area")
        .classed("hidden", false)
        .append("path")
        .datum(data)
        .attr("fill", "springgreen")
        .style("opacity", 1)
        .attr("d", drawArea1);


      var drawArea2 = d3.area()
            .x(function(d,i){return xScale(i*1.82)+margins.left+2;})
            .y0(function(d){return yScale(58);})
            .y1(function(d){return yScale(78);})

     svg.append("g")
        .attr("class","area")
        .classed("hidden", false)
        .append("path")
        .datum(data)
        .attr("fill", "khaki")
        .style("opacity", 1)
        .attr("d", drawArea2);



    var drawArea3 = d3.area()
          .x(function(d,i){return xScale(i*1.82)+margins.left+2;})
          .y0(function(d){return yScale(0);})
          .y1(function(d){return yScale(58);})

      svg.append("g")
          .attr("class","area")
          .classed("hidden", false)
          .append("path")
          .datum(data)
          .attr("fill", "salmon")
          .style("opacity", 1 )
          .attr("d", drawArea3);
  //console.log("currPeng", currPeng)

  //console.log("cummData", cummData)


    svg.selectAll("circle")
    .data(currData)
    .enter()
    .append("circle")
    .attr("id", currPeng.picture.split("-300px.png")[0]+"circle")
     .classed("hidden", false)
     .attr("fill", "blue")
     .attr("cx",function(d,i){return xScale(i);})
     .attr("cy",function(d){return yScale(d);})
     .attr("r", 4)
     .style("opacity",0.8)


}

classDataP.then(function(data)
{

  //console.log("new .js data", data)
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
    heights: 500
  }

  var width = screen.widths+margins.left+margins.right;
  var height = screen.heights+margins.top+margins.bottom;

  var classSVG = d3.select("#graph1")
    .attr("width", width)
    .attr("height", height)
    .style("float", "left")
    .style("clear", "left")



  var xScale = d3.scaleLinear()
                .domain([0,41])
                .range([0, screen.widths])

  var yScale = d3.scaleLinear()
                  .domain([0,100])
                  .range([screen.heights,0])

  var xAxis  = d3.axisBottom(xScale)

  var yAxis  = d3.axisLeft(yScale);


  classSVG.append("g")
         .classed("xAxis",true)
         .call(xAxis)
         .attr("transform","translate("+margins.left+","
         +(margins.top+height-margins.top-margins.bottom)+")"
      );


   classSVG.append("g")
     .classed("yAxis",true)
     .call(yAxis)
     .attr("transform","translate("+(margins.left)+","
     + 5 +")");


     var svg2 = d3.select("#graph2")
       .attr("width", width)
       .attr("height", height)
       //.style("float", "left")
       //.style("clear", "left")



       svg2.append("g")
              .classed("xAxis",true)
              .call(xAxis)
              .attr("transform","translate("+margins.left+","
              +(margins.top+height-margins.top-margins.bottom)+")"
           );


        svg2.append("g")
          .classed("yAxis",true)
          .call(yAxis)
          .attr("transform","translate("+(margins.left)+","
          + 5 +")");

          var svg3 = d3.select("#graph3")
          .attr("width", width)
          .attr("height", height)

  var colors = d3.scaleOrdinal(d3.schemeAccent);

  makePenguinButtons(data, svg2, svg3, margins, yScale, xScale, colors,  height, width, screen.heights, screen.widths);
  drawChart(data, classSVG, svg2, svg3, margins, yScale, xScale, colors);


},
  function(err)
{
  console.log(err);
});
