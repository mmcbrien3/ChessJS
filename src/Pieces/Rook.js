import {Piece} from './Piece.js'
import {NUM_RANKS, NUM_FILES} from '../Board.js';

export class Rook extends Piece {
	constructor(position, color) {
		super(position, color);
	}

	getWatchedPositions(board) {
		let ps = [];
		let possiblePosition = null;
		for (let i = this.position.x + 1; i < NUM_FILES; i++) {
			possiblePosition = {x: i, y: this.position.y};
			if (!board.isPositionOccupied(possiblePosition)) {
				ps.push(possiblePosition);
			} else {
				if (board.isPositionOccupiedByFoe(this.color, possiblePosition)) {
					ps.push(possiblePosition);
				}
				break;
			}
		}
		for (let i = this.position.x - 1; i >= 0; i--) {
			possiblePosition = {x: i, y: this.position.y};
			if (!board.isPositionOccupied(possiblePosition)) {
				ps.push(possiblePosition);
			} else {
				if (board.isPositionOccupiedByFoe(this.color, possiblePosition)) {
					ps.push(possiblePosition);
				}
				break;
			}
		}
		for (let i = this.position.y + 1; i < NUM_RANKS; i++) {
			possiblePosition = {x: this.position.x, y: i};
			if (!board.isPositionOccupied(possiblePosition)) {
				ps.push(possiblePosition);
			} else {
				if (board.isPositionOccupiedByFoe(this.color, possiblePosition)) {
					ps.push(possiblePosition);
				}
				break;
			}
		}
		for (let i = this.position.y - 1; i >= 0; i--) {
			possiblePosition = {x: this.position.x, y: i};
			if (!board.isPositionOccupied(possiblePosition)) {
				ps.push(possiblePosition);
			} else {
				if (board.isPositionOccupiedByFoe(this.color, possiblePosition)) {
					ps.push(possiblePosition);
				}
				break;
			}
		}

		return ps;
	}

	getMovablePositions(board) {
		let watchedPositions = this.getWatchedPositions(board);
		let movablePositions = [];
		for (let i = 0; i < watchedPositions.length; i++) {
			if (!board.isPositionOccupiedByAlly(this.color, watchedPositions[i])) {
				movablePositions.push(watchedPositions[i]);
			}
		}
		return movablePositions;
	}

	getStringRepresentation() {
		return "R";
	}
}