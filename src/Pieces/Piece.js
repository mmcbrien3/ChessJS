
export class Piece {
	constructor(position, color) {
		this.position = position;
		this.color = color;
		this.hasMoved = false;
	}

	moveTo(position) {
		this.hasMoved = true;
		this.position = position;
	}

	getMovablePositions() {}

	getAttackablePositions() {}

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
		let finalPositions = [];
		positions.forEach(pos => {
			if (!board.isPositionOccupiedByAlly(this, pos)) {
				finalPositions.push(pos);
			}
		});
		return finalPositions;
	}
}

export const Colors = Object.freeze({
    WHITE:  Symbol("white"),
    BLACK:  Symbol("black")
});

