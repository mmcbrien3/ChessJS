import { Pawn } from '../src/Pieces/Pawn.js';
import { Colors } from '../src/Pieces/Piece.js';
import { Rook }  from '../src/Pieces/Rook.js';
import { King } from '../src/Pieces/King.js'
import { Board } from '../src/Board.js';
import { jest } from '@jest/globals'

describe('Rook tests', () => {
    it('Test middle of board moves', () => {
        let b = new Board();
        let rook = new Rook({x: 3, y: 3}, Colors.BLACK);
        b.placePiece(rook);

        let expectedMoves = [{x: 0, y: 3}, 
     							{x: 1, y: 3},
     							{x: 2, y: 3},
     							{x: 4, y: 3},
     							{x: 5, y: 3},
     							{x: 6, y: 3},
     							{x: 7, y: 3},
     							{x: 3, y: 0},
     							{x: 3, y: 1},
     							{x: 3, y: 2},
     							{x: 3, y: 4},
     							{x: 3, y: 5},
     							{x: 3, y: 6},
     							{x: 3, y: 7},];

        let actualMoves = rook.getMovablePositions(b);

        testArrayEquality(actualMoves, expectedMoves);
    })

    it('Test pin', () => {
        let b = new Board();
        let rBlack = new Rook({x: 3, y: 1}, Colors.BLACK);
        let rWhite = new Rook({x: 3, y: 3}, Colors.WHITE);
        let kWhite = new King({x: 3, y: 5}, Colors.WHITE);
        b.placePiece(rBlack);
        b.placePiece(rWhite);
        b.placePiece(kWhite);

        let expectedMovesBlack = [{x: 3, y: 0}, 
        							{x: 3, y: 2},
     								{x: 3, y: 3},
     								{x: 4, y: 1},
     								{x: 5, y: 1},
     								{x: 6, y: 1},
     								{x: 7, y: 1},
     								{x: 2, y: 1},
     								{x: 1, y: 1},
     								{x: 0, y: 1}];

     	let expectedMovesWhite = [{x: 3, y: 4},
     								{x: 3, y: 2},
     								{x: 3, y: 1}];

        let actualMovesBlack = rBlack.getMovablePositions(b);
        let actualMovesWhite = rWhite.getMovablePositions(b);


        testArrayEquality(actualMovesWhite, expectedMovesWhite);
        testArrayEquality(actualMovesBlack, expectedMovesBlack);

    })
})

function testArrayEquality(actual, expected) {
	expect(actual).toEqual(expect.arrayContaining(expected));
	expect(expected).toEqual(expect.arrayContaining(actual));
}
