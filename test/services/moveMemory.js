describe('Move Memory service test', function() {
	beforeEach(mockRSPLS());
	it('Will remember user moves', inject(function(moveMemory, rules) {
		for (var move in rules.signs) {
			moveMemory.push(rules.signs[move]);
		}
	}, function(moveMemory, rules) {
		expect(moveMemory.moves).toEqual(rules.signs);
	}));
	it('Will find out player most used move', inject(function(moveMemory, rules) {
		// most used is at index 0
		moveMemory.push(rules.signs[0]);
		moveMemory.push(rules.signs[0]);
		moveMemory.push(rules.signs[0]);
		moveMemory.push(rules.signs[0]);
		moveMemory.push(rules.signs[1]);
		moveMemory.push(rules.signs[1]);
		moveMemory.push(rules.signs[1]);
		moveMemory.push(rules.signs[2]);
		moveMemory.push(rules.signs[2]);
		moveMemory.push(rules.signs[3]);
		moveMemory.push(rules.signs[4]);
		moveMemory.push(rules.signs[5]);
		// first check without memory
		var mostUsed = moveMemory.mostUsed(rules.signs)
		expect(mostUsed.sign).toEqual(rules.signs[0]);
		expect(mostUsed.count).toBe(4);
	}, function(moveMemory, rules) {
		// than check without after reset
		var mostUsed = moveMemory.mostUsed(rules.signs)
		expect(mostUsed.sign).toEqual(rules.signs[0]);
		expect(mostUsed.count).toBe(4);
	}));
	it('Will find out the most used pattern', inject(function(moveMemory, rules) {
		// the sequence to test is 0001
		// so the cpu should win on 1
		moveMemory.push(rules.signs[0]);
		moveMemory.push(rules.signs[0]);
		moveMemory.push(rules.signs[0]);
		moveMemory.push(rules.signs[1]);
		moveMemory.push(rules.signs[0]);
		moveMemory.push(rules.signs[0]);
		moveMemory.push(rules.signs[0]);
		moveMemory.push(rules.signs[1]);
		moveMemory.push(rules.signs[1]);
		moveMemory.push(rules.signs[3]);
		moveMemory.push(rules.signs[1]);
		moveMemory.push(rules.signs[0]);
		moveMemory.push(rules.signs[0]);
		moveMemory.push(rules.signs[0]);
		moveMemory.push(rules.signs[2]);
		moveMemory.push(rules.signs[4]);
		moveMemory.push(rules.signs[0]);
		moveMemory.push(rules.signs[0]);
		moveMemory.push(rules.signs[0]);
		// check actual
		var nextMove = moveMemory.resamblePattern(rules.signs);
		expect(nextMove).toEqual(rules.signs[1]);
	}, function(moveMemory, rules) {
		// check in memory
		var nextMove = moveMemory.resamblePattern(rules.signs);
		expect(nextMove).toEqual(rules.signs[1]);
	}));
});
