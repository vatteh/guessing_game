function GuessingGame(mainBox) {
	this.mainBox = mainBox;
	this.guessesLeft = 5;
	this.myNumber = this.randomNumber();
	this.inputField = this.mainBox.find('#input_field');
	this.guessCountText = this.mainBox.find('#guess-count')
}

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
	} 

	this.guessesLeft--;
	console.log(this.myNumber);

	if (guess == this.myNumber) {
		this.guessedTheNumber();
	} else {
		if (this.guessesLeft == 4) {
			this.guessCountText.html("Four guesses left");
		} else if (this.guessesLeft == 3) {
			this.guessCountText.html("Three guesses left");
		} else if (this.guessesLeft == 2) {
			this.guessCountText.html("Two guesses left");
		} else if (this.guessesLeft == 1) {
			this.guessCountText.html("Last chance");
		} else {
			this.guessCountText.html("Game over. Play again?");
		}
	}
};

GuessingGame.prototype.restart = function() {
	this.guessesLeft = 5;
	this.myNumber = this.randomNumber();
	this.guessCountText.html("You get 5 tries to guess my number").css("font-size", "24px").attr("id", "guess-count");
};

GuessingGame.prototype.hint = function() {
	if (!this.guessCountText.is("#guess-count-win")) {
		this.guessesLeft = 0; 
		this.guessCountText.html("The number was " + this.myNumber).css("font-size", "24px").attr("id", "guess-count");
	}
};

GuessingGame.prototype.guessedTheNumber = function() {
	this.guessCountText.html("You guessed my number!").css("font-size", "32px").attr("id", "guess-count-win");
	this.guessesLeft = 0;
};

GuessingGame.prototype.isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

