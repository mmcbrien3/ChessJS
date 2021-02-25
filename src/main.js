import { GameAdministratorBrowser } from './GameAdministratorBrowser.js';
import { Colors } from './Pieces/Piece.js';

const scaleRatio = window.devicePixelRatio / 3;
console.log(window.devicePixelRatio);
const assetsFolder = "assets/final_assets/";
const viewWidth = window.innerWidth;
const viewHeight = window.innerHeight;


let DEFAULT_SQUARE_SIZE = 64;
let DEFAULT_BOARD_SIZE = DEFAULT_SQUARE_SIZE * 8;

let gameAdmin = new GameAdministratorBrowser();
let selectedPiece = null;

let displaySide = Colors.BLACK;

var config = {
    type: Phaser.Canvas,
    width: DEFAULT_BOARD_SIZE,
    height: DEFAULT_BOARD_SIZE,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

var game = new Phaser.Game(config);
var phaserObject = null;


function drawEmptyBoard(phaser) {
	let next_square = 'lightSquare';
	for (let x = 0; x < 8; x++) {
		for (let y = 0; y < 8 ; y++) {
			phaser.add.image(x * DEFAULT_SQUARE_SIZE + DEFAULT_SQUARE_SIZE / 2,
								y * DEFAULT_SQUARE_SIZE + DEFAULT_SQUARE_SIZE / 2, 
								next_square);
			if (next_square === 'lightSquare') {
				next_square = 'darkSquare';
			} else {
				next_square = 'lightSquare';
			}
		}
		if (next_square === 'lightSquare') {
			next_square = 'darkSquare';
		} else {
			next_square = 'lightSquare';
		}
	}
}


function convertPosToPhaserCoords(pos) {
	let displaySideWhiteCoords = [pos.x * DEFAULT_SQUARE_SIZE + DEFAULT_SQUARE_SIZE / 2, pos.y * DEFAULT_SQUARE_SIZE + DEFAULT_SQUARE_SIZE / 2];
	if (displaySide == Colors.WHITE) {
		return displaySideWhiteCoords;
	} else {
		return [DEFAULT_BOARD_SIZE - displaySideWhiteCoords[0], DEFAULT_BOARD_SIZE - displaySideWhiteCoords[1]];
	}
}

function convertPhaserCoordsToPos(x, y) {
	let displaySideWhitePos = {x: Math.floor(x / DEFAULT_SQUARE_SIZE), y: Math.floor(y / DEFAULT_SQUARE_SIZE)};
	if (displaySide == Colors.WHITE) {
		return displaySideWhitePos;
	} else {
		console.log(displaySideWhitePos)
		return {x: 7 - displaySideWhitePos.x, y: 7 - displaySideWhitePos.y};
	}
}

function createPhaserSprites(phaser, admin) {
	// Make white pawns
	for (let i = 0; i < 8; i++) {
		let pos = {x: i, y: 6};
		let phaserPos = convertPosToPhaserCoords(pos);
		let pawn = phaser.physics.add.sprite(phaserPos[0], phaserPos[1], 'wPawn').setInteractive();
		admin.board.getPieceAtPosition(pos).setPhaserSprite(pawn);
	}

	//Make white pieces
	let pos = {x: 0, y: 7};
	let phaserPos = convertPosToPhaserCoords(pos);
	let wQueenRook = phaser.physics.add.sprite(phaserPos[0], phaserPos[1], 'wRook').setInteractive();
	admin.board.getPieceAtPosition(pos).setPhaserSprite(wQueenRook);

	pos = {x: 1, y: 7};
	phaserPos = convertPosToPhaserCoords(pos);
	let wQueenKnight = phaser.physics.add.sprite(phaserPos[0], phaserPos[1], 'wKnight').setInteractive();
	admin.board.getPieceAtPosition(pos).setPhaserSprite(wQueenKnight);

	pos = {x: 2, y: 7};
	phaserPos = convertPosToPhaserCoords(pos);
	let wQueenBishop = phaser.physics.add.sprite(phaserPos[0], phaserPos[1], 'wBishop').setInteractive();
	admin.board.getPieceAtPosition(pos).setPhaserSprite(wQueenBishop);

	pos = {x: 3, y: 7};
	phaserPos = convertPosToPhaserCoords(pos);
	let wQueen = phaser.physics.add.sprite(phaserPos[0], phaserPos[1], 'wQueen').setInteractive();
	admin.board.getPieceAtPosition(pos).setPhaserSprite(wQueen);

	pos = {x: 4, y: 7};
	phaserPos = convertPosToPhaserCoords(pos);
	let wKing = phaser.physics.add.sprite(phaserPos[0], phaserPos[1], 'wKing').setInteractive();
	admin.board.getPieceAtPosition(pos).setPhaserSprite(wKing);

	pos = {x: 5, y: 7};
	phaserPos = convertPosToPhaserCoords(pos);
	let wKingBishop = phaser.physics.add.sprite(phaserPos[0], phaserPos[1], 'wBishop').setInteractive();
	admin.board.getPieceAtPosition(pos).setPhaserSprite(wKingBishop);

	pos = {x: 6, y: 7};
	phaserPos = convertPosToPhaserCoords(pos);
	let wKingKnight = phaser.physics.add.sprite(phaserPos[0], phaserPos[1], 'wKnight').setInteractive();
	admin.board.getPieceAtPosition(pos).setPhaserSprite(wKingKnight);

	pos = {x: 7, y: 7};
	phaserPos = convertPosToPhaserCoords(pos);
	let wKingRook = phaser.physics.add.sprite(phaserPos[0], phaserPos[1], 'wRook').setInteractive();
	admin.board.getPieceAtPosition(pos).setPhaserSprite(wKingRook);

	// Make black pawns
	for (let i = 0; i < 8; i++) {
		let pos = {x: i, y: 1};
		let phaserPos = convertPosToPhaserCoords(pos);
		let pawn = phaser.physics.add.sprite(phaserPos[0], phaserPos[1], 'bPawn').setInteractive();
		admin.board.getPieceAtPosition(pos).setPhaserSprite(pawn);
	}

	pos = {x: 0, y: 0};
	phaserPos = convertPosToPhaserCoords(pos);
	let bQueenRook = phaser.physics.add.sprite(phaserPos[0], phaserPos[1], 'bRook').setInteractive();
	admin.board.getPieceAtPosition(pos).setPhaserSprite(bQueenRook);

	pos = {x: 1, y: 0};
	phaserPos = convertPosToPhaserCoords(pos);
	let bQueenKnight = phaser.physics.add.sprite(phaserPos[0], phaserPos[1], 'bKnight').setInteractive();
	admin.board.getPieceAtPosition(pos).setPhaserSprite(bQueenKnight);

	pos = {x: 2, y: 0};
	phaserPos = convertPosToPhaserCoords(pos);
	let bQueenBishop = phaser.physics.add.sprite(phaserPos[0], phaserPos[1], 'bBishop').setInteractive();
	admin.board.getPieceAtPosition(pos).setPhaserSprite(bQueenBishop);

	pos = {x: 3, y: 0};
	phaserPos = convertPosToPhaserCoords(pos);
	let bQueen = phaser.physics.add.sprite(phaserPos[0], phaserPos[1], 'bQueen').setInteractive();
	admin.board.getPieceAtPosition(pos).setPhaserSprite(bQueen);

	pos = {x: 4, y: 0};
	phaserPos = convertPosToPhaserCoords(pos);
	let bKing = phaser.physics.add.sprite(phaserPos[0], phaserPos[1], 'bKing').setInteractive();
	admin.board.getPieceAtPosition(pos).setPhaserSprite(bKing);

	pos = {x: 5, y: 0};
	phaserPos = convertPosToPhaserCoords(pos);
	let bKingBishop = phaser.physics.add.sprite(phaserPos[0], phaserPos[1], 'bBishop').setInteractive();
	admin.board.getPieceAtPosition(pos).setPhaserSprite(bKingBishop);

	pos = {x: 6, y: 0};
	phaserPos = convertPosToPhaserCoords(pos);
	let bKingKnight = phaser.physics.add.sprite(phaserPos[0], phaserPos[1], 'bKnight').setInteractive();
	admin.board.getPieceAtPosition(pos).setPhaserSprite(bKingKnight);

	pos = {x: 7, y: 0};
	phaserPos = convertPosToPhaserCoords(pos);
	let bKingRook = phaser.physics.add.sprite(phaserPos[0], phaserPos[1], 'bRook').setInteractive();
	admin.board.getPieceAtPosition(pos).setPhaserSprite(bKingRook);

}

function drawAllPieces(phaser, admin) {
	let pieces = admin.board.getAllPieces();
	pieces.forEach( p => {
		if (p.getStringRepresentation === 'p') {
			let phaserCoords = convertPosToPhaserCoords(p.position);
			p.phaserSprite.setPosition(phaserCoords[0], phaserCoords[1]);
		}
	});
}

function drawPossibleMoves(phaser, selectedPiece, admin) {
	let positions = selectedPiece.getMovablePositions(admin.board);
	positions.forEach( p => {
		let phaserCoords = convertPosToPhaserCoords(p);
		console.log(phaserCoords);
		phaser.possibleMoves.push(phaser.add.image(phaserCoords[0], phaserCoords[1], 'indicator').setAlpha(.5));
	})
}


/**
 * PHASER FUNCTION
 * This function is run by phaser at startup. Load some assets here.
 */
function preload() {
    this.load.image('lightSquare', [assetsFolder + 'light_square.png']);
    this.load.image('darkSquare', [assetsFolder + 'dark_square.png']);
    this.load.image('wPawn', [assetsFolder + 'white_pawn.png']);
    this.load.image('bPawn', [assetsFolder + 'black_pawn.png']);
    this.load.image('indicator', [assetsFolder + 'possible_move.png']);

    this.load.image('wKing', [assetsFolder + 'white_king.png']);
    this.load.image('wQueen', [assetsFolder + 'white_queen.png']);
    this.load.image('wRook', [assetsFolder + 'white_rook.png']);
    this.load.image('wBishop', [assetsFolder + 'white_bishop.png']);
    this.load.image('wKnight', [assetsFolder + 'white_knight.png']);

    this.load.image('bKing', [assetsFolder + 'black_king.png']);
    this.load.image('bQueen', [assetsFolder + 'black_queen.png']);
    this.load.image('bRook', [assetsFolder + 'black_rook.png']);
    this.load.image('bBishop', [assetsFolder + 'black_bishop.png']);
    this.load.image('bKnight', [assetsFolder + 'black_knight.png']);
    this.load.image('gameOver', [assetsFolder + 'gameOver.png']);

    phaserObject = this;
}

/**
 * PHASER FUNCTION
 */
function create() {
	drawEmptyBoard(this);
	gameAdmin.setupAllPieces();
	createPhaserSprites(this, gameAdmin);
	this.possibleMoves = [];
	this.input.on('pointerdown', clickListener, this);
}

/**
 * PHASER FUNCTION
 */
function update() {

}

function performMove(pieceToMove, newPosition) {
	let pieceDestroyed = gameAdmin.makeMove(pieceToMove, newPosition);
	let phaserCoords = convertPosToPhaserCoords(newPosition);
	pieceToMove.phaserSprite.setPosition(phaserCoords[0], phaserCoords[1]);

	if (pieceDestroyed != null) {
		pieceDestroyed.phaserSprite.destroy();
	}

	if (gameAdmin.checkForPromotion(pieceToMove, newPosition)) {
		pieceToMove.phaserSprite.destroy();
		let phaserPos = convertPosToPhaserCoords(newPosition);
		let colorIndicator = 'w';
		if (pieceToMove.color == Colors.BLACK) {
			colorIndicator = 'b';
		}
		let newQueen = phaserObject.physics.add.sprite(phaserPos[0], phaserPos[1], colorIndicator + 'Queen').setInteractive();
		gameAdmin.board.getPieceAtPosition(newPosition).setPhaserSprite(newQueen);

	}

	//this function is called specifically for castling,
	//rook position needs to be updated on phaser side, but it is performed silently
	//by the board class.
	updateAllPhaserPositions();

	if (gameAdmin.checkForEndOfGame()) {
		phaserObject.physics.add.sprite(DEFAULT_BOARD_SIZE / 2, DEFAULT_BOARD_SIZE / 2, 'gameOver');
	}
}

function updateAllPhaserPositions() {
	let pieces = gameAdmin.board.getAllPieces();
	pieces.forEach(p => {
		let currentPos = p.position;
		let phaserCoords = convertPosToPhaserCoords(currentPos);
		p.phaserSprite.setPosition(phaserCoords[0], phaserCoords[1]);
	})
}

function clickListener(pointer, localX, localY, event) {
	console.log(pointer);
	console.log(event);
	let pos = convertPhaserCoordsToPos(pointer.x, pointer.y);
	this.possibleMoves.forEach( pm => pm.destroy());

	if (selectedPiece != null) {
		if (gameAdmin.validateMoveIsLegal(selectedPiece, pos)) {
			performMove(selectedPiece, pos);
		}
		selectedPiece = null;
		return;
	}
	let clickedPiece = gameAdmin.board.getPieceAtPosition(pos);
	if (clickedPiece == null) {
		return;
	}
	if (clickedPiece.color === gameAdmin.currentPlayerColor) {
		selectedPiece = clickedPiece;
	}
	if (selectedPiece != null) {
		console.log(selectedPiece);
		drawPossibleMoves(this, selectedPiece, gameAdmin);
	}
}



