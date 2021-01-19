import {Piece, Colors} from './Pieces/Piece.js';
import {Pawn} from './Pieces/Pawn.js';
import {Rook} from './Pieces/Rook.js';
import {Knight} from './Pieces/Knight.js';
import {Bishop} from './Pieces/Bishop.js';
import {Queen} from './Pieces/Queen.js';
import {King} from './Pieces/King.js';

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

	addPiece(piece) {
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

	setupAllPieces() {
		this.addPiece(new Rook({x:0, y:0}, Colors.BLACK));
		this.addPiece(new Knight({x:1, y:0}, Colors.BLACK));
		this.addPiece(new Bishop({x:2, y:0}, Colors.BLACK));
		this.addPiece(new Queen({x:3, y:0}, Colors.BLACK));
		this.addPiece(new King({x:4, y:0}, Colors.BLACK));
		this.addPiece(new Bishop({x:5, y:0}, Colors.BLACK));
		this.addPiece(new Knight({x:6, y:0}, Colors.BLACK));
		this.addPiece(new Rook({x:7, y:0}, Colors.BLACK));

		for (let i = 0; i < 8; i++) {
			this.addPiece(new Pawn({x: i, y:1}), Colors.BLACK);
		}

		this.addPiece(new Rook({x:0, y:7}, Colors.WHITE));
		this.addPiece(new Knight({x:1, y:7}, Colors.WHITE));
		this.addPiece(new Bishop({x:2, y:7}, Colors.WHITE));
		this.addPiece(new Queen({x:3, y:7}, Colors.WHITE));
		this.addPiece(new King({x:4, y:7}, Colors.WHITE));
		this.addPiece(new Bishop({x:5, y:7}, Colors.WHITE));
		this.addPiece(new Knight({x:6, y:7}, Colors.WHITE));
		this.addPiece(new Rook({x:7, y:7}, Colors.WHITE));

		for (let i = 0; i < 8; i++) {
			this.addPiece(new Pawn({x: i, y:6}), Colors.WHITE);
		}
	}
}