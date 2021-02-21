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

		this.previousMove = {piece: null, oldPosition: null};
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

	/*
	 * Move for real
	*/
	movePiece(piece, newPosition) {

		this.previousMove = {piece: piece, oldPosition: piece.position};

		let isCastlingMove = this.checkForCastling(piece, newPosition);
		let isEnPassantMove = this.checkForEnPassant(piece, newPosition);
		let positionToDestroy;
		if (isEnPassantMove) {
			positionToDestroy = {x: newPosition.x, y: piece.position.y};
		} else {
			positionToDestroy = newPosition;
		}
		let pieceToDestroy = this.getPieceAtPosition(positionToDestroy);
		this.grid[piece.position.y][piece.position.x] = null;
		this.grid[positionToDestroy.y][positionToDestroy.x] = null;
		piece.moveTo(newPosition);
		this.placePiece(piece);

		if (isCastlingMove) {
			let newRookXPos = 5;
			let oldRookXPos = 7;
			//check queenside castle
			if (newPosition.x == 2) {
				newRookXPos = 3;
				oldRookXPos = 0;
			}
			let oldRookPosition = {x: oldRookXPos, y: newPosition.y};
			let newRookPosition = {x: newRookXPos, y: newPosition.y};
			console.log(newRookPosition);
			let rook = this.getPieceAtPosition(oldRookPosition);
			this.movePiece(rook, newRookPosition);
		}


		return pieceToDestroy;
	}

	checkForCastling(piece, newPosition) {
		let isKingMove = piece.getStringRepresentation() === 'K';
		let isKingMoveTwoSquares = Math.abs(newPosition.x - piece.position.x) == 2;
		return isKingMove && isKingMoveTwoSquares;
	}

	checkForEnPassant(piece, newPosition) {
		let isPawnMove = piece.getStringRepresentation() === 'p';
		let pieceAtNewPosition = this.getPieceAtPosition(newPosition);
		let isPawnAttack = piece.position.x != newPosition.x;

		return isPawnMove && isPawnAttack && pieceAtNewPosition == null;
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

		
		this.grid[piece.position.y][piece.position.x] = null;
		piece.position = newPosition;
		this.placePiece(piece);
		
		let isMyKingInCheck = this.isKingInCheck(piece.color);
		piece.position = currentPosition;
		this.grid[piece.position.y][piece.position.x] = piece;
		if (pieceAtNewPosition != null) {
			this.placePiece(pieceAtNewPosition);
		} else {
			this.grid[newPosition.y][newPosition.x] = null;
		}
		return isMyKingInCheck;
	}

	isKingInCheck(color) {
		let foeColor = Colors.WHITE;
		if (color === Colors.WHITE) {
			foeColor = Colors.BLACK;
		}
		let kingPos = this.getKingPosOfColor(color);

		let foePieces = this.getAllPiecesOfColor(foeColor);
		let positionsWatchedByFoes = [];
		foePieces.forEach(piece => positionsWatchedByFoes.push(...piece.getWatchedPositions(this)));

		return positionsWatchedByFoes.some(item => JSON.stringify(item) === JSON.stringify(kingPos));

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