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
				if (ps.length > 0 && this.isPositionFree(board, possiblePosition)) {
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
				if (ps.length > 0 && this.isPositionFree(board, possiblePosition)) {
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
		let enPassantSquare = this.getEnPassantSquare(board);
		if (enPassantSquare != null) {
			ps.push(enPassantSquare);
		}

		ps = this.filterOutPinnedPositions(ps, board);
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

	getEnPassantSquare(board) {
		let previousMovePiece = board.previousMove.piece;
		let previousMoveOldPosition = board.previousMove.oldPosition;

		if (previousMovePiece == null) {
			return null;
		}

		if (previousMovePiece.color === this.color) {
			return null;
		}

		if (previousMovePiece.getStringRepresentation() !== "p") {
			return null;
		}

		if (Math.abs(previousMoveOldPosition.y - previousMovePiece.position.y) != 2) {
			return null;
		}

		let pieceToLeft = board.getPieceAtPosition({x: this.position.x - 1, y: this.position.y});
		let pieceToRight = board.getPieceAtPosition({x: this.position.x + 1, y: this.position.y});

		if (pieceToLeft == previousMovePiece) {
			if (this.color === Colors.BLACK) {
				return {x: this.position.x - 1, y: this.position.y + 1};
			} else {
				return {x: this.position.x - 1, y: this.position.y - 1};
			}
		}

		if (pieceToRight == previousMovePiece) {
			if (this.color === Colors.BLACK) {
				return {x: this.position.x + 1, y: this.position.y + 1};
			} else {
				return {x: this.position.x + 1, y: this.position.y - 1};
			}
		}
	}

	getStringRepresentation() {
		return "p";
	}
}