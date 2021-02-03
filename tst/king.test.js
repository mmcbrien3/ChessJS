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
    });

    it('Test can castle queenside', () => {
        let b = new Board();
        let kBlack = new King({x: 4, y: 0}, Colors.BLACK);
        let rBlack = new Rook({x: 0, y: 0}, Colors.BLACK);
        let pBlack = new Pawn({x: 0, y: 1}, Colors.BLACK);

        let kWhite = new King({x: 4, y: 7}, Colors.WHITE);
        let rWhite = new Rook({x: 0, y: 7}, Colors.WHITE);
        let pWhite = new Pawn({x: 0, y: 6}, Colors.WHITE);

        b.placePiece(kBlack);
        b.placePiece(rBlack);
        b.placePiece(pBlack);
        b.placePiece(kWhite);
        b.placePiece(rWhite);
        b.placePiece(pWhite);

        let castlingMoveBlack = {x: 2, y: 0};
        let castlingMoveWhite = {x: 2, y: 7};

        let actualKingMovesBlack = kBlack.getMovablePositions(b);
        let actualKingMovesWhite = kWhite.getMovablePositions(b);

        expect(actualKingMovesBlack).toEqual(expect.arrayContaining([castlingMoveBlack]));
        expect(actualKingMovesWhite).toEqual(expect.arrayContaining([castlingMoveWhite]));
    })

    it('Test can castle kingside', () => {
        let b = new Board();
        let kBlack = new King({x: 4, y: 0}, Colors.BLACK);
        let rBlack = new Rook({x: 7, y: 0}, Colors.BLACK);
        let pBlack = new Pawn({x: 7, y: 1}, Colors.BLACK);

        let kWhite = new King({x: 4, y: 7}, Colors.WHITE);
        let rWhite = new Rook({x: 7, y: 7}, Colors.WHITE);
        let pWhite = new Pawn({x: 7, y: 6}, Colors.WHITE);

        b.placePiece(kBlack);
        b.placePiece(rBlack);
        b.placePiece(pBlack);
        b.placePiece(kWhite);
        b.placePiece(rWhite);
        b.placePiece(pWhite);

        let castlingMoveBlack = {x: 6, y: 0};
        let castlingMoveWhite = {x: 6, y: 7};

        let actualKingMovesBlack = kBlack.getMovablePositions(b);
        let actualKingMovesWhite = kWhite.getMovablePositions(b);

        expect(actualKingMovesBlack).toEqual(expect.arrayContaining([castlingMoveBlack]));
        expect(actualKingMovesWhite).toEqual(expect.arrayContaining([castlingMoveWhite]));
    });

    it('Test cannot castle while in check', () => {
        let b = new Board();
        let kBlack = new King({x: 4, y: 0}, Colors.BLACK);
        let rBlack = new Rook({x: 7, y: 0}, Colors.BLACK);
        let pBlack = new Pawn({x: 3, y: 6}, Colors.BLACK);

        let kWhite = new King({x: 4, y: 7}, Colors.WHITE);
        let rWhite = new Rook({x: 0, y: 7}, Colors.WHITE);
        let pWhite = new Pawn({x: 3, y: 1}, Colors.WHITE);

        b.placePiece(kBlack);
        b.placePiece(rBlack);
        b.placePiece(pBlack);
        b.placePiece(kWhite);
        b.placePiece(rWhite);
        b.placePiece(pWhite);

        let castlingMoveBlack = {x: 2, y: 0};
        let castlingMoveWhite = {x: 6, y: 7};

        let actualKingMovesBlack = kBlack.getMovablePositions(b);
        let actualKingMovesWhite = kWhite.getMovablePositions(b);

        expect(actualKingMovesBlack).not.toEqual(expect.arrayContaining([castlingMoveBlack]));
        expect(actualKingMovesWhite).not.toEqual(expect.arrayContaining([castlingMoveWhite]));
    });

    it('Test cannot castle through check', () => {
        let b = new Board();
        let kBlack = new King({x: 4, y: 0}, Colors.BLACK);
        let rBlack = new Rook({x: 7, y: 0}, Colors.BLACK);
        let pBlack = new Pawn({x: 4, y: 6}, Colors.BLACK);

        let kWhite = new King({x: 4, y: 7}, Colors.WHITE);
        let rWhite = new Rook({x: 7, y: 7}, Colors.WHITE);
        let pWhite = new Pawn({x: 4, y: 1}, Colors.WHITE);

        b.placePiece(kBlack);
        b.placePiece(rBlack);
        b.placePiece(pBlack);
        b.placePiece(kWhite);
        b.placePiece(rWhite);
        b.placePiece(pWhite);

        let castlingMoveBlack = {x: 2, y: 0};
        let castlingMoveWhite = {x: 6, y: 7};

        let actualKingMovesBlack = kBlack.getMovablePositions(b);
        let actualKingMovesWhite = kWhite.getMovablePositions(b);

        expect(actualKingMovesBlack).not.toEqual(expect.arrayContaining([castlingMoveBlack]));
        expect(actualKingMovesWhite).not.toEqual(expect.arrayContaining([castlingMoveWhite]));
    });
})

function testArrayEquality(actual, expected) {
	expect(actual).toEqual(expect.arrayContaining(expected));
	expect(expected).toEqual(expect.arrayContaining(actual));
}
