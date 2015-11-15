describe('Score service test', function() {
	beforeEach(mockRSPLS());
	it('Win 1 - Tie 0 - Lost 0 - Situation > 0', inject(function(score) {
		score.addGame(true, true)
		expect(score.win).toEqual(1);
		expect(score.tie).toEqual(0);
		expect(score.lost).toEqual(0);
		expect(score.situation).toBeGreaterThan(0);
	}));
	it('Win 0 - Tie 1 - Lost 0 - Situation = 0', inject(function(score) {
		score.addGame(false, true)
		expect(score.win).toEqual(0);
		expect(score.tie).toEqual(1);
		expect(score.lost).toEqual(0);
		expect(score.situation).toEqual(0);
	}));
	it('Win 0 - Tie 0 - Lost 1 - Situation < 0', inject(function(score) {
		score.addGame(false, false)
		expect(score.win).toEqual(0);
		expect(score.tie).toEqual(0);
		expect(score.lost).toEqual(1);
		expect(score.situation).toBeLessThan(0);
	}));
	it('Will remember previous results', inject(function(score) {
		score.addGame(true, true)
		expect(score.win).toEqual(1);
		expect(score.tie).toEqual(0);
		expect(score.lost).toEqual(0);
		expect(score.situation).toBeGreaterThan(0);
	}), inject(function(score) {
		score.addGame(false, true)
		expect(score.win).toEqual(1);
		expect(score.tie).toEqual(1);
		expect(score.lost).toEqual(0);
		expect(score.situation).toBeGreaterThan(0);
	}), inject(function(score) {
		score.addGame(false, false)
		expect(score.win).toEqual(1);
		expect(score.tie).toEqual(1);
		expect(score.lost).toEqual(1);
		expect(score.situation).toEqual(0);
	}));
});
