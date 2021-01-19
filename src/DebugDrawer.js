import {Board, NUM_RANKS, NUM_FILES} from './Board.js';



export class DebugDrawer {

	constructor() {
		this.board = new Board();
		this.board.setupAllPieces();	
	}

	drawBoard() {
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

}

let dd = new DebugDrawer();
dd.drawBoard();

let pieces = dd.board.getAllPieces();

pieces.forEach(piece => {
	let posString = ""
	piece.getMovablePositions(dd.board).forEach(pos => posString += `x:${pos.x}, y:${pos.y} `);
	console.log(`${piece.getStringRepresentation()} (${piece.position.x}, ${piece.position.y}): ${posString}`)

	});