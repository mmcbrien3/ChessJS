import {Piece} from './Piece.js'

export class Knight extends Piece {
	constructor(position, color) {
		super(position, color);
	}

	getWatchedPositions(board) {
		let ps = [];
		let possiblePosition = null;

		possiblePosition = {x: this.position.x + 1, y: this.position.y + 2};
		if (board.isPositionOnBoard(possiblePosition)) {
			ps.push(possiblePosition);
		}
		possiblePosition = {x: this.position.x + 2, y: this.position.y + 1};
		if (board.isPositionOnBoard(possiblePosition)) {
			ps.push(possiblePosition);
		}
		possiblePosition = {x: this.position.x + 2, y: this.position.y - 1};
		if (board.isPositionOnBoard(possiblePosition)) {
			ps.push(possiblePosition);
		}
		possiblePosition = {x: this.position.x + 1, y: this.position.y - 2};
		if (board.isPositionOnBoard(possiblePosition)) {
			ps.push(possiblePosition);
		}
		possiblePosition = {x: this.position.x - 1, y: this.position.y - 2};
		if (board.isPositionOnBoard(possiblePosition)) {
			ps.push(possiblePosition);
		}
		possiblePosition = {x: this.position.x - 2, y: this.position.y - 1};
		if (board.isPositionOnBoard(possiblePosition)) {
			ps.push(possiblePosition);
		}
		possiblePosition = {x: this.position.x - 2, y: this.position.y + 1};
		if (board.isPositionOnBoard(possiblePosition)) {
			ps.push(possiblePosition);
		}
		possiblePosition = {x: this.position.x - 1, y: this.position.y + 2};
		if (board.isPositionOnBoard(possiblePosition)) {
			ps.push(possiblePosition);
		}

		return ps;
	}

	getMovablePositions(board) {
		let watchedPositions = this.getWatchedPositions(board);
		let movablePositions = this.filterOutPositionsOccupiedByAllies(watchedPositions, board);
		movablePositions = this.filterOutPinnedPositions(movablePositions, board);

		return movablePositions;
	}

	getStringRepresentation() {
		return "N";
	}
}