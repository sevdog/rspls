// Mock module with its dependecies
function mockRSPLS() {
	return module('rspls', function($provide) {
		$provide.value('$window', {
			localStorage: localStorageMock()
		});
	});
}