import {Board, NUM_RANKS, NUM_FILES} from './Board.js';
import {Piece, Colors} from './Pieces/Piece.js';

const prompt = require('prompt-sync')({sigint: true});

export class GameAdministrator {
	
	constructor() {
		this.board = new Board();
		this.setupAllPieces();
		this.currentPlayerColor = Colors.WHITE;
	}

	requestNextMoveFromCurrentPlayer() {
		let pieceToMove = null;
		let validMoves = [];
		do {
			let xPos = parseInt(prompt("Give x position of piece to move "));
			let yPos = parseInt(prompt("Give y position of piece to move "));
			pieceToMove = this.board.getPieceAtPosition({x: xPos, y: yPos});
			if (pieceToMove == null) {
				continue;
			}
			validMoves = pieceToMove.getMovablePositions(this.board);
		} while (pieceToMove == null || validMoves.length == 0 || pieceToMove.color !== this.currentPlayerColor);

		console.log(`Going to move:`);
		console.log(pieceToMove);
		console.log("Valid moves for this piece are:");
		console.log(validMoves);

		let positionToMoveTo = null;
		do {
			let xPos = parseInt(prompt("Give x position of position to move to "));
			let yPos = parseInt(prompt("Give y position of position to move to "));
			positionToMoveTo = {x: xPos, y: yPos};
		} while (!this.validateMoveIsLegal(pieceToMove, positionToMoveTo));

		this.makeMove(pieceToMove, positionToMoveTo);
	}

	makeMove(piece, newPosition) {
		this.board.movePiece(piece, newPosition);
	}

	validateMoveIsLegal(piece, newPosition) {
		let movablePositions = piece.getMovablePositions(this.board);
		return movablePositions.some(item => JSON.stringify(item) === JSON.stringify(newPosition));
	}

	checkForEndOfGame() {
		return false;
	}

	changeCurrentPlayer() {
		if (this.currentPlayerColor === Colors.WHITE) {
			this.currentPlayerColor = Colors.BLACK;
		} else {
			this.currentPlayerColor = Colors.WHITE;
		}
	}

	runGame() {
		while (this.checkForEndOfGame() == false) {
			this.drawDebugBoard();
			this.showValidMoves();
			this.requestNextMoveFromCurrentPlayer();
			this.changeCurrentPlayer();
		}
		console.log("Game Over");
	}

	drawDebugBoard() {
		for (var y = 0; y < NUM_RANKS; y++) {
			let row = this.board.grid[y];
			let rowString = "";
			for (var x = 0; x < NUM_FILES; x++) {
				let piece = row[x];
				if (piece == null) {
					rowString += "_";
				} else {
					rowString += piece.getStringRepresentation();
				}
			}
			console.log(rowString);
		}
	}

	showValidMoves() {
		let pieces = this.board.getAllPieces();

		pieces.forEach(piece => {
			let posString = ""
			piece.getMovablePositions(this.board).forEach(pos => posString += `x:${pos.x}, y:${pos.y} `);
			console.log(`${piece.getStringRepresentation()} [${piece.color.toString()}] (${piece.position.x}, ${piece.position.y}): ${posString}`)
		});
	}

	setupAllPieces() {
		this.board.placePiece(new Rook({x:0, y:0}, Colors.BLACK));
		this.board.placePiece(new Knight({x:1, y:0}, Colors.BLACK));
		this.board.placePiece(new Bishop({x:2, y:0}, Colors.BLACK));
		this.board.placePiece(new Queen({x:3, y:0}, Colors.BLACK));
		this.board.placePiece(new King({x:4, y:0}, Colors.BLACK));
		this.board.placePiece(new Bishop({x:5, y:0}, Colors.BLACK));
		this.board.placePiece(new Knight({x:6, y:0}, Colors.BLACK));
		this.board.placePiece(new Rook({x:7, y:0}, Colors.BLACK));

		for (let i = 0; i < 8; i++) {
			this.board.placePiece(new Pawn({x: i, y:1}, Colors.BLACK));
		}

		this.board.placePiece(new Rook({x:0, y:7}, Colors.WHITE));
		this.board.placePiece(new Knight({x:1, y:7}, Colors.WHITE));
		this.board.placePiece(new Bishop({x:2, y:7}, Colors.WHITE));
		this.board.placePiece(new Queen({x:3, y:7}, Colors.WHITE));
		this.board.placePiece(new King({x:4, y:7}, Colors.WHITE));
		this.board.placePiece(new Bishop({x:5, y:7}, Colors.WHITE));
		this.board.placePiece(new Knight({x:6, y:7}, Colors.WHITE));
		this.board.placePiece(new Rook({x:7, y:7}, Colors.WHITE));

		for (let i = 0; i < 8; i++) {
			this.board.placePiece(new Pawn({x: i, y:6}, Colors.WHITE));
		}
	}
}

let ga = new GameAdministrator();
ga.runGame();
