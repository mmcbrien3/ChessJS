import {Piece, Colors} from './Piece.js'

export class Pawn extends Piece {
	constructor(position, color) {
		super(position, color);
	}

	getMovablePositions(board) {
		let ps = [];
		let possiblePosition = null;
		if (this.color === Colors.BLACK) {
			possiblePosition = {x: this.position.x, y: this.position.y + 1};
			if (this.isPositionFree(board, possiblePosition)) {
				ps.push(possiblePosition);
			}
			if (!this.hasMoved) {
				possiblePosition = {x: this.position.x, y: this.position.y + 2};
				if (this.isPositionFree(board, possiblePosition)) {
					ps.push(possiblePosition);
				}	
			}
			possiblePosition = {x: this.position.x + 1, y: this.position.y + 1};
			if (board.isPositionOnBoard(possiblePosition) && board.isPositionOccupiedByFoe(this.color, possiblePosition)) {
				ps.push(possiblePosition);
			}
			possiblePosition = {x: this.position.x - 1, y: this.position.y + 1};
			if (board.isPositionOnBoard(possiblePosition) && board.isPositionOccupiedByFoe(this.color, possiblePosition)) {
				ps.push(possiblePosition);
			}
		} else {
			possiblePosition = {x: this.position.x, y: this.position.y - 1};
			if (this.isPositionFree(board, possiblePosition)) {
				ps.push(possiblePosition);
			}
			if (!this.hasMoved) {
				possiblePosition = {x: this.position.x, y: this.position.y - 2};
				if (this.isPositionFree(board, possiblePosition)) {
					ps.push(possiblePosition);
				}	
			}
			possiblePosition = {x: this.position.x + 1, y: this.position.y - 1};
			if (board.isPositionOnBoard(possiblePosition) && board.isPositionOccupiedByFoe(this.color, possiblePosition)) {
				ps.push(possiblePosition);
			}
			possiblePosition = {x: this.position.x - 1, y: this.position.y - 1};
			if (board.isPositionOnBoard(possiblePosition) && board.isPositionOccupiedByFoe(this.color, possiblePosition)) {
				ps.push(possiblePosition);
			}
		}
		return ps;
	}

	isPositionFree(board, position) {
		return board.isPositionOnBoard(position) && !board.isPositionOccupied(position)
	}

	getWatchedPositions(board) {
		let ps = [];
		let possiblePosition = null;
		if (this.color === Colors.BLACK) {
			possiblePosition = {x: this.position.x + 1, y: this.position.y + 1};
			if (board.isPositionOnBoard(possiblePosition)) {
				ps.push(possiblePosition);
			}
			possiblePosition = {x: this.position.x - 1, y: this.position.y + 1};
			if (board.isPositionOnBoard(possiblePosition)) {
				ps.push(possiblePosition);
			}
		} else {
			possiblePosition = {x: this.position.x + 1, y: this.position.y - 1};
			if (board.isPositionOnBoard(possiblePosition)) {
				ps.push(possiblePosition);
			}
			possiblePosition = {x: this.position.x - 1, y: this.position.y - 1};
			if (board.isPositionOnBoard(possiblePosition)) {
				ps.push(possiblePosition);
			}
		}
		return ps;
	}

	getStringRepresentation() {
		return "p";
	}
}