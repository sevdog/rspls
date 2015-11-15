describe('Storage wrapper service', function() {
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
