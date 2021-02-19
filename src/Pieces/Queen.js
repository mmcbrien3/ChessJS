import {Piece} from './Piece.js';
import {NUM_RANKS, NUM_FILES} from '../Board.js';

export class Queen extends Piece {
	constructor(position, color) {
		super(position, color);
	}

	getWatchedPositions(board) {
		let ps = [];
		let possiblePosition = null;
		//ROOK-LIKE MOVES
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
		//BISHOP-LIKE MOVES
		let displacement = 1;
		while (true) {
			possiblePosition = {x: this.position.x + displacement, y: this.position.y + displacement};
			if (!board.isPositionOnBoard(possiblePosition)) {
				break;
			}
			if (!board.isPositionOccupied(possiblePosition)) {
				ps.push(possiblePosition);
			} else {
				if (board.isPositionOccupiedByFoe(this.color, possiblePosition)) {
					ps.push(possiblePosition);
				}
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
			if (!board.isPositionOccupied(possiblePosition)) {
				ps.push(possiblePosition);
			} else {
				if (board.isPositionOccupiedByFoe(this.color, possiblePosition)) {
					ps.push(possiblePosition);
				}
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
			if (!board.isPositionOccupied(possiblePosition)) {
				ps.push(possiblePosition);
			} else {
				if (board.isPositionOccupiedByFoe(this.color, possiblePosition)) {
					ps.push(possiblePosition);
				}
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
			if (!board.isPositionOccupied(possiblePosition)) {
				ps.push(possiblePosition);
			} else {
				if (board.isPositionOccupiedByFoe(this.color, possiblePosition)) {
					ps.push(possiblePosition);
				}
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
		return "Q";
	}
}