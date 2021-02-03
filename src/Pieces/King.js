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
		let movablePositions = this.filterOutPositionsOccupiedByAllies(watchedPositions, board);
		movablePositions = this.filterOutPinnedPositions(movablePositions, board);

		if (!this.hasMoved) {
			let possiblyKingsideRook = board.getPieceAtPosition({x: this.position.x + 3, y: this.position.y});
			let possiblyQueensideRook = board.getPieceAtPosition({x: this.position.x - 4, y: this.position.y});

			if (possiblyKingsideRook != null && possiblyKingsideRook.getStringRepresentation() === 'R') {
				let hasRookMoved = possiblyKingsideRook.hasMoved;
				let arePositionsFree = board.getPieceAtPosition({x: this.position.x + 1, y: this.position.y}) === null && 
										board.getPieceAtPosition({x: this.position.x + 2, y: this.position.y}) === null;
				let arePositionsInCheck = board.isKingInCheck(this.color) ||
											board.isMyKingInCheckWithMove(this, {x: this.position.x + 1, y: this.position.y}) ||
											board.isMyKingInCheckWithMove(this, {x: this.position.x + 2, y: this.position.y});
				if (!hasRookMoved && arePositionsFree && !arePositionsInCheck) {
					movablePositions.push({x: this.position.x + 2, y: this.position.y});
				}
			}
			if (possiblyQueensideRook != null && possiblyQueensideRook.getStringRepresentation() === 'R') {
				let hasRookMoved = possiblyQueensideRook.hasMoved;
				let arePositionsFree = board.getPieceAtPosition({x: this.position.x - 1, y: this.position.y}) === null && 
										board.getPieceAtPosition({x: this.position.x - 2, y: this.position.y}) === null &&
										board.getPieceAtPosition({x: this.position.x - 3, y: this.position.y}) === null;
				let arePositionsInCheck = board.isKingInCheck(this.color) ||
											board.isMyKingInCheckWithMove(this, {x: this.position.x - 1, y: this.position.y}) ||
											board.isMyKingInCheckWithMove(this, {x: this.position.x - 2, y: this.position.y});
				if (!hasRookMoved && arePositionsFree && !arePositionsInCheck) {
					movablePositions.push({x: this.position.x - 2, y: this.position.y});
				}
			}
		}
		return movablePositions;
	}

	getStringRepresentation() {
		return "K";
	}
}