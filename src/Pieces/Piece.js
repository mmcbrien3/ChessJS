
export class Piece {
	constructor(position, color) {
		this.position = position;
		this.color = color;
		this.hasMoved = false;
		this.phaserSprite = null;
	}

	setPhaserSprite(phaserSprite) {
		this.phaserSprite = phaserSprite;
	}

	moveTo(position) {
		this.hasMoved = true;
		this.position = position;
	}

	getMovablePositions() {}

	getStringRepresentation() {
		return "U";
	}

	filterOutPinnedPositions(positions, board) {
		let finalPositions = [];
		positions.forEach(pos => {
			if (!board.isMyKingInCheckWithMove(this, pos)) {
				finalPositions.push(pos);
			}
		})
		return finalPositions;
	}

	filterOutPositionsOccupiedByAllies(positions, board) {
		let movablePositions = [];
		for (let i = 0; i < positions.length; i++) {
			if (!board.isPositionOccupiedByAlly(this.color, positions[i])) {
				movablePositions.push(positions[i]);
			}
		}
		return movablePositions;
	}
}

export const Colors = Object.freeze({
    WHITE:  Symbol("white"),
    BLACK:  Symbol("black")
});

