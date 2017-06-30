"use strict";

(function () {

  //Math random number function to use in goals count
  function RandNumFunction() {
    return Math.random();
  }

  function PlayAudio() {
    document.getElementById("myAudio").play();
  }

  window.onload = function () {

    /*Clicking a "SHOOT" button attempt to score against the opposing team.
    shots have a random chance of succeeding or failing
    number of shots taken should increase every click on the "SHOOT" button
    number of hits obviously only increases when the shot is successful
    Clicking the "RESET" button resets all the shot and score counters and adds 1 to the number of resets*/

    //Reset button and count varibles
    var resetButton = document.querySelector("#reset");
    var countresets = document.querySelector("#num-resets");

    //Team one shoot button, no of shots and goals variables
    var toneshootButton = document.querySelector("#teamone-shoot");
    var teamoneshots = document.querySelector("#teamone-numshots");
    var teamonegoals = document.querySelector("#teamone-numhits");

    //Team two shoot button, no of shots and goals variables
    var ttwoshootButton = document.querySelector("#teamtwo-shoot");
    var teamtwoshots = document.querySelector("#teamtwo-numshots");
    var teamtwogoals = document.querySelector("#teamtwo-numhits");

    //Event listen for Reset button click, counting resets and resetting the values for team counts.
    resetButton.addEventListener("click", function () {
      //console.log(" Reset button clicked");

      //it is for counting no of resets
      var NoofResets = parseInt(countresets.innerHTML) + 1;
      countresets.innerHTML = NoofResets;
      //console.log(countresets.innerHTML);

      //resets the count for both teams shots and goals
      if (NoofResets > 0) {
        teamoneshots.innerHTML = 0;
        teamtwoshots.innerHTML = 0;
        teamonegoals.innerHTML = 0;
        teamtwogoals.innerHTML = 0;
      }
    });

    //Team one shots and goals count upon each click
    toneshootButton.addEventListener("click", function () {
      //console.log("Team One shoot button clicked");

      //This is for counting no of shots
      var NumofTeamoneshots = parseInt(teamoneshots.innerHTML) + 1;
      teamoneshots.innerHTML = NumofTeamoneshots;
      //console.log(teamoneshots.innerHTML);

      //this is for counting no of goals.. if the random num generated is < 0.5 it didn't add the goals
      //if the random generated is >0.5 it will add a goal
      if (RandNumFunction() > .5) {
        var NumofTeamonegoals = parseInt(teamonegoals.innerHTML) + 1;
        teamonegoals.innerHTML = NumofTeamonegoals;
        PlayAudio();
      }
    });

    //Team two shots and goals count upon each click
    ttwoshootButton.addEventListener("click", function () {
      //console.log("Team two shoot button clicked");

      //This is for counting no of shots
      var NumofTeamtwoshots = parseInt(teamtwoshots.innerHTML) + 1;
      teamtwoshots.innerHTML = NumofTeamtwoshots;
      //console.log(teamtwoshots.innerHTML);

      //this is for counting no of goals.. if the random num generated is < 0.5 it didn't add the goals
      //if the random generated is >0.5 it will add a goal
      if (RandNumFunction() > .3) {
        var NumofTeamtwogoals = parseInt(teamtwogoals.innerHTML) + 1;
        teamtwogoals.innerHTML = NumofTeamtwogoals;
        PlayAudio();
      }
    });
  };
})();