import {Board, NUM_RANKS, NUM_FILES} from './Board.js';
import {Piece, Colors} from './Pieces/Piece.js';
import { Pawn } from './Pieces/Pawn.js';
import { Rook } from './Pieces/Rook.js';
import { Knight } from './Pieces/Knight.js'
import { Bishop } from './Pieces/Bishop.js'
import { Queen } from './Pieces/Queen.js'
import { King } from './Pieces/King.js'
import { GameAdministrator } from './GameAdministrator.js'

import promptSync from 'prompt-sync';
const prompt = promptSync();

export class GameAdministratorBrowser extends GameAdministrator {
	
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

}

let ga = new GameAdministratorBrowser();
ga.runGame();
