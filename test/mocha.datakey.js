/*global define,it */
var assert = require('assert')
, Datakey = require('../')
;

describe('datakey', function(){
	describe('#get', function(){
		it('should get a key from object', function(done){
			var datakey = new Datakey();
			var keys = ['ID', 'name']
			var testData = { ID: 1, name: 'AA', result: 1000 };
			assert.equal(datakey.get(testData, keys), '1\x00AA');
			done();
		});
		it('should get a key with diffrent divider', function(done){
			var datakey = new Datakey({divider: '~'});
			var keys = ['ID', 'name']
			var testData = { ID: 1, name: 'AA', result: 1000 };
			assert.equal(datakey.get(testData, keys), '1~AA');
			done();
		});
		
	});
	describe('#levelup', function(){
		it('should get levelup batch with a length of 3', function(done){
			var datakey = new Datakey();
			var keys = ['ID', 'name']
			var testData = [{ ID: 1, name: 'AA', result: 56 },{ ID: 1, name: 'AB', result: 67 },{ ID: 1, name: 'AC', result: 78 }];
			assert.equal(datakey.levelup(testData, keys).length, 3);
			done();
		});
		it('should get a level db key', function(done){
			var datakey = new Datakey();
			var keys = ['ID', 'name']
			var testData = [{ ID: 1, name: 'AA', result: 56 },{ ID: 1, name: 'AB', result: 67 },{ ID: 1, name: 'AC', result: 78 }];
			assert.equal(datakey.levelup(testData, keys)[1].key, '1\x00AB');
			done();
		});
		it('should get a name value', function(done){
			var datakey = new Datakey();
			var keys = ['ID', 'name']
			var testData = [{ ID: 1, name: 'AA', result: 56 },{ ID: 1, name: 'AB', result: 67 },{ ID: 1, name: 'AC', result: 78 }];
			assert.equal(datakey.levelup(testData, keys)[2].value.name, 'AC');
			done();
		});
		it('should process only one', function(done){
			var datakey = new Datakey();
			var keys = ['ID', 'name']
			var testData = { ID: 1, name: 'AA', result: 56 };
			assert.equal(datakey.levelup(testData, keys).length, 1);
			done();
		});
	});
});

