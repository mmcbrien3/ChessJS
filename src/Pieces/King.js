import {Piece, Colors} from './Piece.js'

export class King extends Piece {
	constructor(position, color) {
		super(position, color);
	}

	getWatchedPositions(board) {
		let ps = [];
		let possiblePosition = null;

		possiblePosition = {x: this.position.x, y: this.position.y + 1};
		if (board.isPositionOnBoard(possiblePosition)) {
			ps.push(possiblePosition);
		}
		possiblePosition = {x: this.position.x + 1, y: this.position.y + 1};
		if (board.isPositionOnBoard(possiblePosition)) {
			ps.push(possiblePosition);
		}
		possiblePosition = {x: this.position.x + 1, y: this.position.y};
		if (board.isPositionOnBoard(possiblePosition)) {
			ps.push(possiblePosition);
		}
		possiblePosition = {x: this.position.x + 1, y: this.position.y - 1};
		if (board.isPositionOnBoard(possiblePosition)) {
			ps.push(possiblePosition);
		}
		possiblePosition = {x: this.position.x, y: this.position.y - 1};
		if (board.isPositionOnBoard(possiblePosition)) {
			ps.push(possiblePosition);
		}
		possiblePosition = {x: this.position.x - 1, y: this.position.y - 1};
		if (board.isPositionOnBoard(possiblePosition)) {
			ps.push(possiblePosition);
		}
		possiblePosition = {x: this.position.x - 1, y: this.position.y};
		if (board.isPositionOnBoard(possiblePosition)) {
			ps.push(possiblePosition);
		}
		possiblePosition = {x: this.position.x - 1, y: this.position.y + 1};
		if (board.isPositionOnBoard(possiblePosition)) {
			ps.push(possiblePosition);
		}

		return ps;
	}

	getMovablePositions(board) {
		let watchedPositions = this.getWatchedPositions(board);
		let movablePositions = [];
		for (let i = 0; i < watchedPositions.length; i++) {
			// check that position isn't held by ally and doesn't cause check
			if (!board.isPositionOccupiedByAlly(this.color, watchedPositions[i]) && !board.isMyKingInCheckWithMove(this, watchedPositions[i])) {
				movablePositions.push(watchedPositions[i]);
			}
		}
		return movablePositions;
	}

	getStringRepresentation() {
		return "K";
	}
}