'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () => {
	for (let i = 0; i < board.length; i++) {
		console.log(board[i]);
	}
};

const generateSolution = () => {
	for (let i = 0; i < 4; i++) {
		const randomIndex = getRandomInt(0, letters.length);
		solution += letters[randomIndex];
	}
};

const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
};
// Declaring a function generateHint with parameter of guess that
// takes the guessArray values and compares it against the
// solutionArray value to determine: 1) if the letters are in the correct
// location and 2) if any letters are matching
const generateHint = (guess) => {
	// Declaring variables that each split up the passed in arguments
	// into each letter
	let solutionArray = solution.split('');
	let guessArray = guess.split('');
	// Declaring the default value for both the correctLetterLocations
	// and letters as zero.  These values keep track of how many correct
	// letter and corresponding locations are correct.
	let correctLetterLocations = 0;
	let correctLetters = 0;
	// Using a for loop to iterate through solutionArray to determine
	// the letter location
	for (let i = 0; i < solutionArray.length; i++) {
		// if the value of solutionArray at an iterated index is equal to
		// the value of the guessArray at same index, the correctLetterLocation
		// variable is incremented one and the solutionArray index is set
		// to null.  Setting it to null allows those nulled values to be used in
		// the next loop to determine how many correct letters
		if (solutionArray[i] === guessArray[i]) {
			correctLetterLocations++;
			solutionArray[i] = null;
		}
	}
	// using a for loop to iterate through the solutionArray to determine the
	// correct letters
	for (let i = 0; i < solutionArray.length; i++) {
		// create a variable of targetIndex that is equal to the index of the first
		// appearance of guessArray[i] letter in the solutionArray.  If the targetIndex
		// exists or (greater than -1) it will increment the correctLetters by one and
		//solutionArray index at that targetIndex will be nulled.
		let targetIndex = solutionArray.indexOf(guessArray[i]);
		if (targetIndex > -1) {
			correctLetters++;
			solutionArray[targetIndex] = null;
		}
	}
	// Return a string template for the values of the correct letter and locations
	return `${correctLetterLocations}-${correctLetters}`;
	// your code here
};

// Declaring a function of mastermind that starts the game and takes in a user input
// to see how many correct letters and locations they guess correctly to match
// the solution.
const mastermind = (guess) => {
	solution = 'abcd'; // Comment this out to generate a random solution
	// Defining a variable of hint that is equal to the generateHint function which
	// takes the user input for guess and returns how many of the correct
	// letter locations and letters the user selected correctly
	let hint = generateHint(guess);
	// Values of both the user guess and the results from hint are pushed to the board
	// after every turn.  This provides a log of previous user inputs and how many correct
	//letters and locations per turn.
	board.push(`${guess}-${hint}`);
	// If the user guess is equal to the solution, the user is alerted that they won
	if (guess === solution) {
		console.log('You guessed it!');
		return 'You guessed it!';
	}
	// If the user reaches the tenth turn and has not matched the solution, the user is
	// alerted that they ran of turn and given the solution.
	if (board.length === 10) {
		console.log(`You ran out of turns! The solution was ${solution}`);
		return `You ran out of turns! The solution was ${solution}`;
		// If user does not correctly match the solution and not reached the 10th turn,
		// they will be alerted to guess again and prompted to input a guess.
	} else {
		return 'Guess Again';
	}

	// your code here
};

const getPrompt = () => {
	rl.question('guess: ', (guess) => {
		mastermind(guess);
		printBoard();
		getPrompt();
	});
};

// Tests

if (typeof describe === 'function') {
	solution = 'abcd';
	describe('#mastermind()', () => {
		it('should register a guess and generate hints', () => {
			mastermind('aabb');
			assert.equal(board.length, 1);
		});
		it('should be able to detect a win', () => {
			assert.equal(mastermind(solution), 'You guessed it!');
		});
	});

	describe('#generateHint()', () => {
		it('should generate hints', () => {
			assert.equal(generateHint('abdc'), '2-2');
		});
		it('should generate hints if solution has duplicates', () => {
			assert.equal(generateHint('aabb'), '1-1');
		});
	});
} else {
	generateSolution();
	getPrompt();
}
