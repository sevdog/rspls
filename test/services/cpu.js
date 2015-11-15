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
