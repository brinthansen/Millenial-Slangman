var slangChoices = [
"Glo Up",
"Lit" ,
"woke" ,
"salty" ,
"supreme" ,
"migos" ,
"SoundCloud",
"techno",
"bogo",
"drop" ,



];

// sl
var slangPhotos = [

];

// array for letters guessed by the user
var lettersGuessed = [];

// variables for wins, losses, and remaining guesses
var wins = 0;
var losses = 0;


// global variables
var slangChosen;
var guessesLeft
var hiddenAnswer;
var randomIndex;

window.onload = function() {

  document.getElementById("slangPhotos").style.visibility = "hidden";

  // call gamebegin to start game
  gameBegin();

}

function gameBegin() {

  // reset number of guesses and letters guessed array
  
  lettersGuessed = [];

  // write initial values for wins, losses, and remaining guesses to the screen
  document.getElementById("winCount").innerHTML = wins;
  document.getElementById("lossCount").innerHTML = losses;
  document.getElementById("guessCount").innerHTML = guessesLeft;
  document.getElementById("guessedLetters").innerHTML = lettersGuessed;
  

  // choose a team from the array
  randomIndex = Math.floor(Math.random() * slangChoices.length);
  slangChosen = slangChoices[randomIndex].toLowerCase();
  
  guessesLeft = slangChosen.length;
  // create a variable to store the word in underscores
  hiddenAnswer = "";

  // replace disease name with underscores for game
  for (var i = 0; i < slangChosen.length; i++) {
    
    // replace only letters, not spaces
    if (slangChosen.charAt(i) !== " ") {

      hiddenAnswer += "_ ";

    } else {
      hiddenAnswer += "&nbsp;&nbsp;";
    }
  }

  document.getElementById("gameWord").innerHTML = hiddenAnswer;
}

document.onkeyup = function(event) {

  // determine if the key pressed was a letter
  //if (event.which < 65 || event.which > 90) {
    //return;
  //}

  // store the letter
  var userChoice = event.key.toLowerCase();
  
  // push userChoice into the array of letters guessed by the user
  lettersGuessed.push(userChoice);
  document.getElementById("guessedLetters").innerHTML = lettersGuessed;

  // decrease guessesLeft by 1
  guessesLeft--;
  document.getElementById("guessCount").innerHTML = guessesLeft;

  // empty hiddenAnswer to rebuild
  hiddenAnswer = "";

  // checks to see if the letter guessed is in the array
  for (var i = 0; i < slangChosen.length; i++) {

    var correctLetter = slangChosen.charAt(i);

    if (correctLetter < 65 || correctLetter > 90) {

      hiddenAnswer += "&nbsp;&nbsp;";
      continue;
    }

    if (userChoice === slangChosen.charAt(i)) {

      hiddenAnswer += userChoice + " ";

    } else { // User types wrong letter

      // Check array to see if the correct letter was chosen
      var found = false;
      for (var j = 0; j < lettersGuessed.length; j++) {

        if(correctLetter === lettersGuessed[j]) {
          hiddenAnswer += lettersGuessed[j] + " ";
          found = true;
          break;
        }
      }

      if(found === false) {
        hiddenAnswer += "_ ";
      }
    } 
  }

  document.getElementById("gameWord").innerHTML = hiddenAnswer;

  // define loss conditions

  var underscoreFound = false;
  for (var k = 0; k < hiddenAnswer.length; k++) {

    // if underscores remaining and no guesses left
    if (hiddenAnswer.charAt(k) === "_") {
      underscoreFound = true;
    }
  }

  // define win conditions
  if (underscoreFound === false && guessesLeft >= 0) {
    document.getElementById("slangPhotos").src = slangPhotos[randomIndex];
    document.getElementById("slangPhotos").style.visibility = "visible";
    document.getElementById("result").innerHTML = "nice work fam.";
    wins++;
    var audio = new Audio('assets/sounds/you_win.mp3');
    audio.play();
    gameBegin();
  }

  // define loss condition
  if (underscoreFound === true && guessesLeft === 0) {
    document.getElementById("teamImage").src = "assets/images/lose.jpg";
    document.getElementById("teamImage").style.visibility = "visible";
    document.getElementById("result").innerHTML = "damn, better luck next time " + slangChosen + ".";
    losses++;
    var audio = new Audio('assets/sounds/lose.mp3');
    audio.play();
    gameBegin();
  }
}