
var classDataP = d3.json("classData.json")

var getPenguin = function(data, index)
{
  return data[index];
}

var getGrades = function(penguin, gradeType)
{
  var grades = []
  var max = gradeType[0].max;
  gradeType.forEach(function(d,i) {return grades.push(((d.grade)/max)*100); });

  var day = []
  gradeType.forEach(function(d,i) {return day.push(d.day); });

  console.log("day", day)

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
  var quizPerc = 0.15;
  var hwPerc = 0.15;
  var testPerc = 0.40;
  var finalPerc = 0.30;

  var quizGrades = getGrades(penguin, penguin.quizes);
  var hwGrades = getGrades(penguin, penguin.homework);
  var testGrades = getGrades(penguin, penguin.test);
  var finalGrades = getGrades(penguin, penguin.final);

  var averages = getAverages(quizGrades)
  console.log("avg", averages)

}

var getAverages = function(grades)
{
  var avg = []
  var totalDays = 0
  var gradeTotal = 0
  var currDay = 1
  var lastGradeDay = 0

  //var lastGradeDay = 0

 //console.log("grades", grades[0][1])
 //console.log("grades in avg", grades)

  for(var i = 0; i < 41; i++)
  {
     //console.log("check", grades[lastGradeDay][1])
     
     // make sure we don't run out of data in array
     if (lastGradeDay >= grades.length)
     {
       avg.push(avg[i-1]);
       i = i+1;
     }
      else if (grades[lastGradeDay][1]== currDay)
      {
        totalDays += 1;
        gradeTotal += grades[lastGradeDay][0];
        avg.push(gradeTotal/totalDays);
        lastGradeDay += 1;


      }
      else
      {
        //make sure we don't use position -1
        if (i > 0)

        {
          avg.push(avg[i-1]);
        }
        else
        {
          avg.push(0);
        }

      }

      currDay += 1;


    }


  return avg;

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


},
  function(err)
{
  console.log(err);
});
