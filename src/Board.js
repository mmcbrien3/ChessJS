import {Colors} from './Pieces/Piece.js';

export const NUM_RANKS = 8;
export const NUM_FILES = 8;
export class Board {
	
	constructor() {
		this.grid = [];
		for (var y = 0; y < NUM_RANKS; y++) {
			this.grid.push([]);
			for (var x = 0; x < NUM_FILES; x++) {
				this.grid[y].push(null);
			}
		}
	}

	getAllPieces() {
		let pieces = [];
		for (var y_pos = 0; y_pos < NUM_RANKS; y_pos++) {
			for (var x_pos = 0; x_pos < NUM_FILES; x_pos++) {
				let piece = this.getPieceAtPosition({x: x_pos, y: y_pos});
				if (piece != null) {
					pieces.push(piece);
				}
			}
		}
		return pieces;
	}

	movePiece(piece, newPosition) {
		this.grid[piece.position.y][piece.position.x] = null;
		piece.moveTo(newPosition);
		this.placePiece(piece);
	}

	placePiece(piece) {
		this.grid[piece.position.y][piece.position.x] = piece;
	}

	getPieceAtPosition(position) {
		if (!this.isPositionOnBoard(position)) {
			return null;
		}
		return this.grid[position.y][position.x];
	}

	isPositionOccupied(position) {
		return this.getPieceAtPosition(position) != null;
	}

	getAllPiecesOfColor(color) {
		let pieces = this.getAllPieces();
		let piecesOfColor = [];
		pieces.forEach(p => {
			if (p.color === color) {
				piecesOfColor.push(p);
			}
		});
		return piecesOfColor;
	}

	isPositionOccupiedByAlly(myColor, position) {
		let otherPiece = this.getPieceAtPosition(position);
		if (otherPiece == null) {
			return false;
		}

		if (otherPiece.color === myColor) {
			return true;
		}

		return false;
	}

	isPositionOccupiedByFoe(myColor, position) {
		let otherPiece = this.getPieceAtPosition(position);
		if (otherPiece == null) {
			return false;
		}

		if (otherPiece.color === myColor) {
			return false;
		}

		return true;
	}

	isPositionOnBoard(position) {
		return position.x < NUM_FILES && position.x >= 0 && position.y < NUM_RANKS && position.y >= 0;
	}

	isMyKingInCheckWithMove(piece, newPosition) {
		let isKingInCheck = false;
		let currentPosition = piece.position;
		let pieceAtNewPosition = this.getPieceAtPosition(newPosition);

		let foeColor = Colors.WHITE;
		if (piece.color === Colors.WHITE) {
			foeColor = Colors.BLACK;
		}
		
		this.grid[piece.position.y][piece.position.x] = null;
		piece.position = newPosition;
		this.placePiece(piece);
		let kingPos = this.getKingPosOfColor(piece.color);

		let foePieces = this.getAllPiecesOfColor(foeColor);
		let positionsWatchedByFoes = [];
		foePieces.forEach(piece => positionsWatchedByFoes.push(...piece.getWatchedPositions(this)));

		if (positionsWatchedByFoes.some(item => JSON.stringify(item) === JSON.stringify(kingPos))) {
			isKingInCheck = true;
		}

		piece.position = currentPosition;
		this.grid[piece.position.y][piece.position.x] = piece;
		if (pieceAtNewPosition != null) {
			this.placePiece(pieceAtNewPosition);
		} else {
			this.grid[newPosition.y][newPosition.x] = null;
		}

		return isKingInCheck;
	}

	getKingPosOfColor(color) {

		let piecesOfColor = this.getAllPiecesOfColor(color);

		for (let i = 0; i < piecesOfColor.length; i++) {
			if (piecesOfColor[i].getStringRepresentation() === "K") {
				return piecesOfColor[i].position;
			}
		}
	}

	
}