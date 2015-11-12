describe('Storage service', function() {
	beforeEach(mockRSPLS());
	it('Will save the value', inject(function(storageWrapper){
		// first save the value
		storageWrapper.set('string', 'test');
		storageWrapper.set('number', 1);
		storageWrapper.set('object', {foo: 'bar', baz: 1});
		storageWrapper.set('array', [1,2,3]);
	}, function(storageWrapper) {
		expect(storageWrapper.get('string', '')).toEqual('test');
		expect(storageWrapper.get('number', 0)).toEqual(1);
		expect(storageWrapper.get('object', {})).toEqual({foo: 'bar', baz: 1});
		expect(storageWrapper.get('array', [])).toEqual([1,2,3]);
	}));

	it('Will get default value when missing', inject(function(storageWrapper) {
		expect(storageWrapper.get('string', '')).toEqual('');
		expect(storageWrapper.get('number', 0)).toEqual(0);
		expect(storageWrapper.get('object', {})).toEqual({});
		expect(storageWrapper.get('array', [])).toEqual([]);
	}));
});

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
});

describe('CPU service test', function() {
	beforeEach(mockRSPLS());
	describe('With default settings', function() {
		it('Will use all signs', inject(function(cpu, rules) {
			var randomSpy = spyOn(Math, 'random');
			for (var i in rules.signs) {
				randomSpy.and.returnValue(0.2 * i);
				var choosed = cpu.choose();
				expect(rules.signs).toContain(choosed.sign);
			}
		}));
		it('Will not choose based on player previous move', inject(function(cpu, rules) {
			spyOn(Math, 'random').and.returnValue(0.5);
			cpu.rememberMove(rules.signs[0]);
			var choosed = cpu.choose();
			expect(parseInt(rules.wins[rules.signs[0]][choosed.idx])).toBe(0);
		}));
	});
	describe('With classic signs settings', function() {
		it('Will use only classic signs', inject(function(cpu, rules, settings) {
			settings.values.onlyClassic = true;
			var randomSpy = spyOn(Math, 'random');
			for (var i in rules.signs) {
				randomSpy.and.returnValue(0.2 * i);
				var choosed = cpu.choose();
				expect(rules.classics).toContain(choosed.sign);
			}
		}));
	});
	describe('With memory alghorithm settings', function() {
		it('Will use a sign which will win on player most used sign', inject(function(cpu, rules, settings) {
			settings.values.algorithm = 'memory';
			cpu.rememberMove(rules.signs[0]);
			cpu.rememberMove(rules.signs[0]);
			cpu.rememberMove(rules.signs[0]);
			cpu.rememberMove(rules.signs[1]);
			cpu.rememberMove(rules.signs[1]);
			cpu.rememberMove(rules.signs[2]);
			cpu.rememberMove(rules.signs[0]);
			var choosed = cpu.choose();
			expect(parseInt(rules.wins[choosed.sign][0])).toBe(1);
		}));
	});
});
