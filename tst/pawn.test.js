import { Pawn } from '../src/Pieces/Pawn.js';
import { Colors } from '../src/Pieces/Piece.js';
import { Board } from '../src/Board.js';

describe('Pawn tests', () => {
    it('Test has not moved', () => {
    	let b = new Board();
        let pBlack = new Pawn({x:0, y:1}, Colors.BLACK);
        let pWhite = new Pawn({x:0, y:6}, Colors.WHITE);
        b.placePiece(pBlack);
        b.placePiece(pWhite);

        let expectedMovesBlack = [{x: 0, y: 2}, {x: 0, y: 3}];
        let expectedMovesWhite = [{x: 0, y: 5}, {x: 0, y: 4}];

        let actualMovesBlack = pBlack.getMovablePositions(b);
        let actualMovesWhite = pWhite.getMovablePositions(b);

        expect(actualMovesBlack).toEqual(expectedMovesBlack);
        expect(actualMovesWhite).toEqual(expectedMovesWhite);
    })

   	it('Test has moved', () => {
    	let b = new Board();
        let pBlack = new Pawn({x:0, y:1}, Colors.BLACK);
        let pWhite = new Pawn({x:0, y:6}, Colors.WHITE);
        b.placePiece(pBlack);
        b.placePiece(pWhite);
        pBlack.hasMoved = true;
        pWhite.hasMoved = true;

        let expectedMovesBlack = [{x: 0, y: 2}];
        let expectedMovesWhite = [{x: 0, y: 5}];

        let actualMovesBlack = pBlack.getMovablePositions(b);
        let actualMovesWhite = pWhite.getMovablePositions(b);

        expect(actualMovesBlack).toEqual(expectedMovesBlack);
        expect(actualMovesWhite).toEqual(expectedMovesWhite);
    })

    it('Test is blocked', () => {
    	let b = new Board();
        let pBlack = new Pawn({x:0, y:1}, Colors.BLACK);
        let pWhite = new Pawn({x:0, y:2}, Colors.WHITE);
        b.placePiece(pBlack);
        b.placePiece(pWhite);
        pWhite.hasMoved = true;

        let expectedMovesBlack = [];
        let expectedMovesWhite = [];

        let actualMovesBlack = pBlack.getMovablePositions(b);
        let actualMovesWhite = pWhite.getMovablePositions(b);

        expect(actualMovesBlack).toEqual(expectedMovesBlack);
        expect(actualMovesWhite).toEqual(expectedMovesWhite);
    })

    it('Test take diaganol', () => {
    	let b = new Board();
        let pBlack = new Pawn({x:1, y:5}, Colors.BLACK);
        let pWhite = new Pawn({x:0, y:6}, Colors.WHITE);
        b.placePiece(pBlack);
        b.placePiece(pWhite);
        pBlack.hasMoved = true;

        let expectedMovesBlack = [{x: 1, y: 6}, {x: 0, y: 6}];
        let expectedMovesWhite = [{x: 0, y: 5}, {x: 0, y: 4}, {x: 1, y: 5}];

        let actualMovesBlack = pBlack.getMovablePositions(b);
        let actualMovesWhite = pWhite.getMovablePositions(b);

        expect(actualMovesBlack).toEqual(expectedMovesBlack);
        expect(actualMovesWhite).toEqual(expectedMovesWhite);
    })
})
