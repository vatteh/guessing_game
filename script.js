function GuessingGame(mainBox) {
	this.mainBox = mainBox;
	this.guessesLeft = 5;
	this.guessesMade = [];
	this.myNumber = this.randomNumber();
	this.inputField = this.mainBox.find('#input_field');
	this.guessCountText = this.mainBox.find('#guess-count');
	this.guessButton = this.mainBox.find('.guess_button');
	this.soundFx = this.mainBox.find('#soundFx'); 
	this.circles = this.mainBox.find('.circleBase').map(function() {
    	return $(this);
  	});
};

GuessingGame.prototype.randomNumber = function() {
	return Math.floor(Math.random() * 100) + 1;
};

GuessingGame.prototype.submitGuess = function() {

	var guess = this.inputField.val();
	this.inputField.val('');

	if (this.guessesLeft == 0) {
		return;
	} else if (!this.isNumber(guess)) {
		this.guessCountText.html("You need to submit an actual number").css('color', 'red').delay(150).fadeIn(function () {
   			$(this).css("color", "white");
   		});

   		return;
	} else if (guess < 1 || guess > 100) {
		this.guessCountText.html("Your guess needs to be between 1 and 100").css('color', 'red').delay(150).fadeIn(function () {
   			$(this).css("color", "white");
   		});

   		return;
	} else if (this.guessesMade.indexOf(guess) > -1) {
		this.guessCountText.html("You've already submitted this number!").css('color', 'red').delay(150).fadeIn(function () {
   			$(this).css("color", "white");
   		});

   		return;
	}

	this.guessesLeft--;
	this.guessesMade.push(guess);
	console.log(this.myNumber);

	if (guess == this.myNumber) {
		this.guessedTheNumber();
		this.circles[this.guessesMade.length-1].attr("id", "circleType-Win");
	} else {
		if (this.guessesLeft == 4) {
			this.guessCountText.html(this.circleType(guess)[0] + this.circleType(guess)[1] + "Four guesses left");
			this.guessButton.attr("id", "guess-4");
			this.circles[0].attr("id", this.circleType(guess)[2]).html(guess);
		} else if (this.guessesLeft == 3) {
			this.guessCountText.html(this.circleType(guess)[0] + this.circleType(guess)[1] + "Three guesses left");
			this.guessButton.attr("id", "guess-3");
			this.circles[1].attr("id", this.circleType(guess)[2]).html(guess);
		} else if (this.guessesLeft == 2) {
			this.guessCountText.html(this.circleType(guess)[0] + this.circleType(guess)[1] + "Two guesses left");
			this.guessButton.attr("id", "guess-2");
			this.circles[2].attr("id", this.circleType(guess)[2]).html(guess);
		} else if (this.guessesLeft == 1) {
			this.guessCountText.html(this.circleType(guess)[0] + this.circleType(guess)[1] + "Last chance");
			this.guessButton.attr("id", "guess-1");
			this.circles[3].attr("id", this.circleType(guess)[2]).html(guess);
		} else {
			this.guessCountText.html(this.circleType(guess)[0] + "Game over. Play again?");
			this.guessButton.attr("id", "guess-0");
			this.circles[4].attr("id", this.circleType(guess)[2]).html(guess);
		}
	}
};

GuessingGame.prototype.restart = function() {
	this.guessesLeft = 5;
	this.myNumber = this.randomNumber();
	this.guessCountText.html("You get 5 tries to guess my number").css("font-size", "24px").attr("id", "guess-count");
	this.guessButton.attr("id", "guess-5");
	this.guessesMade = [];
	this.circles = this.circles.map(function() {
    	return this.attr("id", "").html("");
  	});
};

GuessingGame.prototype.hint = function() {
	if (!this.guessCountText.is("#guess-count-win")) {
		this.guessesLeft = 0; 
		this.guessCountText.html("The number was " + this.myNumber).css("font-size", "24px").attr("id", "guess-count");
	}
};

GuessingGame.prototype.guessedTheNumber = function() {
	this.guessCountText.html(this.myNumber + " is it! You guessed my number!").attr("id", "guess-count-win");
	this.soundFx[0].play();
	this.guessesLeft = 0;
};

GuessingGame.prototype.isNumber = function(number) {
  return !isNaN(parseFloat(number)) && isFinite(number);
};

GuessingGame.prototype.circleType = function(guess) {
  var result = [];
  var hotness;
  var guessUpDown;

  if (Math.abs(guess - this.myNumber) <= 5) {
  	hotness = guess + " is very hot! ";
  	guessUpDown = guess > this.myNumber ? "Guess lower. " : " Guess higher. "; 
  	result.push(hotness);
  	result.push(guessUpDown);
  	result.push("circleType-VeryHot");
  } else if (Math.abs(guess - this.myNumber) <= 10) {
  	hotness = guess + " is hot! ";
  	guessUpDown = guess > this.myNumber ? "Guess lower. " : " Guess higher. "; 
  	result.push(hotness);
  	result.push(guessUpDown);
  	result.push("circleType-Hot");
  } else if (Math.abs(guess - this.myNumber) <= 30) {
  	hotness = guess + " is warm! ";
  	guessUpDown = guess > this.myNumber ? "Guess lower. " : " Guess higher. "; 
  	result.push(hotness);
  	result.push(guessUpDown);
  	result.push("circleType-Warm");
  } else if (Math.abs(guess - this.myNumber) <= 50) {
  	hotness = guess + " is cold! ";
  	guessUpDown = guess > this.myNumber ? "Guess lower. " : " Guess higher. "; 
  	result.push(hotness);
  	result.push(guessUpDown);
  	result.push("circleType-Cold");
  } else { 
  	hotness = guess + " is very cold! ";
  	guessUpDown = guess > this.myNumber ? "Guess lower. " : " Guess higher. "; 
  	result.push(hotness);
  	result.push(guessUpDown);
  	result.push("circleType-VeryCold");
  }

  return result;
};
