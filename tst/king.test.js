import { Pawn } from '../src/Pieces/Pawn.js';
import { Colors } from '../src/Pieces/Piece.js';
import { Rook }  from '../src/Pieces/Rook.js';
import { King } from '../src/Pieces/King.js'
import { Board } from '../src/Board.js';
import { jest } from '@jest/globals'

describe('King tests', () => {
    it('Test middle of board moves', () => {
        let b = new Board();
        let king = new King({x: 3, y: 3}, Colors.BLACK);
        b.placePiece(king);

        let expectedMoves = [{x: 2, y: 3}, 
     							{x: 2, y: 2},
     							{x: 3, y: 2},
     							{x: 4, y: 2},
     							{x: 4, y: 3},
     							{x: 4, y: 4},
     							{x: 3, y: 4},
     							{x: 2, y: 4}];

        let actualMoves = king.getMovablePositions(b);

        testArrayEquality(actualMoves, expectedMoves);
    })

    it('Test cannot move into check', () => {
        let b = new Board();
        let kBlack = new King({x: 3, y: 1}, Colors.BLACK);
        let kWhite = new King({x: 3, y: 3}, Colors.WHITE);
        b.placePiece(kBlack);
        b.placePiece(kWhite);

        let expectedMovesBlack = [{x: 4, y: 1}, 
        							{x: 4, y: 0},
     								{x: 3, y: 0},
                                    {x: 2, y: 0},
     								{x: 2, y: 1}];

     	let expectedMovesWhite = [{x: 4, y: 3}, 
                                    {x: 4, y: 4},
                                    {x: 3, y: 4},
                                    {x: 2, y: 4},
                                    {x: 2, y: 3}];

        let actualMovesBlack = kBlack.getMovablePositions(b);
        let actualMovesWhite = kWhite.getMovablePositions(b);

        testArrayEquality(actualMovesBlack, expectedMovesBlack);
        testArrayEquality(actualMovesWhite, expectedMovesWhite);
    })
})

function testArrayEquality(actual, expected) {
	expect(actual).toEqual(expect.arrayContaining(expected));
	expect(expected).toEqual(expect.arrayContaining(actual));
}
