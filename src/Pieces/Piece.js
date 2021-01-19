import {Board} from '../Board.js';

export class Piece {
	constructor(position, color) {
		this.position = position;
		this.color = color;
		this.hasMoved = false;
	}

	moveTo(position) {
		this.hasMoved = true;
		this.position = position;
	}

	getMovablePositions() {}

	getAttackablePositions() {}

	canJump() {
		return false;
	}

	getStringRepresentation() {
		return "U";
	}
}

export const Colors = Object.freeze({
    WHITE:  Symbol("white"),
    BLACK:  Symbol("black")
});

