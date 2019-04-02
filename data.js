
var classDataP = d3.json("classData.json")

var getPenguin = function(data, index)
{
  return data[index];
}

var getGrades = function(penguin, gradeType)
{
  var grades = []
  var max = gradeType[0].max;
  gradeType.forEach(function(d,i) {return grades.push(((d.grade)/max)); });

  var day = []
  gradeType.forEach(function(d,i) {return day.push(d.day); });

  //console.log("day", day)

  var gradeDay = []

  var subArray = []
  for (var i = 0; i < grades.length; i++)
  {
    subArray = [grades[i], day[i]];
    gradeDay.push(subArray);
  }

  return gradeDay;
}


/*Quizzes are worth 15% of the grade
Homeworks are worth 15% of the grade
There are 2 tests, each worth 20% of the grade
The final is worth 30% of the grade*/

var getCummulative = function(penguin)
{
  var quizGrades = getGrades(penguin, penguin.quizes);
  var hwGrades = getGrades(penguin, penguin.homework);
  var testGrades = getGrades(penguin, penguin.test);
  var finalGrades = getGrades(penguin, penguin.final);

  //var pointsPoss = quizGrades.length*penguin.quizes[0].max;

  var avgQuiz = getAverages(quizGrades)
  var avgHW = getAverages(hwGrades)
  var avgTest = getAverages(testGrades)
  var avgFinal = getAverages(finalGrades)
// console.log("testAvg", avgTest)
  var totals = calcTotals(avgQuiz, avgHW, avgTest, avgFinal)

//  console.log("totals", totals)
  return totals;

}

var calcTotals = function(avgQuiz, avgHW, avgTest, avgFinal)
{
  var quizPerc = 0.15;
  var hwPerc = 0.15;
  var testPerc = 0.40;
  var finalPerc = 0.30;

  var total = []


  for (var i = 0; i < 41; i++)
  {
    var dayTotal = 0;
    var pointsPoss = 0;

    if (avgQuiz[i]!=-1)
    {
      // add the weight to weight
      var percentQuiz = avgQuiz[i]*quizPerc;
      dayTotal += percentQuiz;
      pointsPoss += quizPerc;
    }
    if (avgHW[i]!=-1)
    {
      //if not zero
      var percentHW = avgHW[i]*hwPerc;
      dayTotal += percentHW;
      pointsPoss += hwPerc;
    }
    if (avgTest[i]!=-1)
    {
      //if not zero
      var percentTest = avgTest[i]*testPerc;
      dayTotal += percentTest;
      pointsPoss += testPerc;
    }
    if (avgFinal[i]!=-1)
    {
      //if not zero
      var percentFinal = avgFinal[i]*finalPerc;
      dayTotal += percentFinal;
      pointsPoss += finalPerc;
    }

    total.push(dayTotal/pointsPoss*100);


    //console.log(avgTest[i])
//  console.log("checkTotal", dayTotal/pointsPoss)

    //total.push(totalGrade*totalWeight)//percentQuiz + percentHW + percentTest + percentFinal)
  }
  return total;
}

var getAverages = function(grades)
{
  var avg = []
  var totalGrades = 1
  var gradeTotal = 0
  var currDay = 1
  var lastGradeDay = 0

 //console.log("grades", grades[0][1])
 //console.log("grades in avg", grades)

  for(var i = 0; i < 41; i++)
  {
     //console.log("check", grades[lastGradeDay][1])

     // make sure we don't run out of data in array
     if (lastGradeDay >= grades.length)
     {
       avg.push(avg[i-1]);
       lastGradeDay = lastGradeDay+1;
     }
      else if (grades[lastGradeDay][1] == currDay)
      {
        //console.log("totalDays", totalDays)

        gradeTotal += grades[lastGradeDay][0];
        //console.log("gradeTotal", gradeTotal)
        avg.push(gradeTotal/totalGrades);
        //console.log("thing being pushed", gradeTotal/totalGrades)
        lastGradeDay += 1;
        totalGrades += 1;

      }
      else
      {
        //make sure we don't use position -1
        if (i > 0)

        {
          avg.push(avg[i-1]);
          //console.log("position before", avg[i-1])
        }
        else
        {
          avg.push(-1);
          //console.log("pushing zero")
        }

      }

      currDay += 1;


    }

//console.log("avg",avg)
  return avg;

}

var getClassAvg = function(data)
{
  var penguinList = []
  data.forEach(function(d, i) {return penguinList.push(getPenguin(data, i));})
  console.log(penguinList)

  var allCummulative = []
//  var allCummDay = []
 var total = []
  for (var i = 0; i < penguinList.length; i++)
  {
    total = getCummulative(penguinList[i])
    allCummulative.push(total);
  }

console.log("Made it to spot 1")
 var classAvg = []
  for (var i = 0; i < 41; i++)
  {
    console.log("Made it to spot 2")
    var avg = 0;
    for (var  index = 0;  index < penguinList.length; index++)
    {
      console.log("Made it to spot 3")
      avg += allCummulative[index][i]
    }
    classAvg.push(avg/penguinList.length)
  }

  return classAvg;

}


classDataP.then(function(data)
{
  console.log("data", data)
  var index = 0;

  var penguin = getPenguin(data,index);
  console.log("penguin", penguin)

  var gradeType = penguin.quizes;
  var grades = getGrades(penguin, gradeType);

  console.log("grades", grades)

  getCummulative(penguin);
console.log("Made it to spot 1")
  var classAvg = getClassAvg(data);
  console.log("classAvg",classAvg)


},
  function(err)
{
  console.log(err);
});
