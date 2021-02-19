import {Piece} from './Piece.js'

export class Bishop extends Piece {
	constructor(position, color) {
		super(position, color);
	}

	getWatchedPositions(board) {
		let ps = [];
		let possiblePosition = null;
		let displacement = 1;
		while (true) {
			possiblePosition = {x: this.position.x + displacement, y: this.position.y + displacement};
			if (!board.isPositionOnBoard(possiblePosition)) {
				break;
			}
			ps.push(possiblePosition);
			if (board.isPositionOccupied(possiblePosition)) {
				break;
			}
			displacement += 1;
		}
		displacement = 1;
		while (true) {
			possiblePosition = {x: this.position.x + displacement, y: this.position.y - displacement};
			if (!board.isPositionOnBoard(possiblePosition)) {
				break;
			}
			ps.push(possiblePosition);
			if (board.isPositionOccupied(possiblePosition)) {
				break;
			}
			displacement += 1;
		}
		displacement = 1;
		while (true) {
			possiblePosition = {x: this.position.x - displacement, y: this.position.y + displacement};
			if (!board.isPositionOnBoard(possiblePosition)) {
				break;
			}
			ps.push(possiblePosition);
			if (board.isPositionOccupied(possiblePosition)) {
				break;
			}
			displacement += 1;
		}
		displacement = 1;
		while (true) {
			possiblePosition = {x: this.position.x - displacement, y: this.position.y - displacement};
			if (!board.isPositionOnBoard(possiblePosition)) {
				break;
			}
			ps.push(possiblePosition);
			if (board.isPositionOccupied(possiblePosition)) {
				break;
			}
			displacement += 1;
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
		return "B";
	}
}