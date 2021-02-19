import {Board, NUM_RANKS, NUM_FILES} from './Board.js';
import {Piece, Colors} from './Pieces/Piece.js';
import { Pawn } from './Pieces/Pawn.js';
import { Rook } from './Pieces/Rook.js';
import { Knight } from './Pieces/Knight.js'
import { Bishop } from './Pieces/Bishop.js'
import { Queen } from './Pieces/Queen.js'
import { King } from './Pieces/King.js'
import { GameAdministrator } from './GameAdministrator.js'

export class GameAdministratorBrowser extends GameAdministrator {
	
	requestNextMoveFromCurrentPlayer() {
		
	}

}
