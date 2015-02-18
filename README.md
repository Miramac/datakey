# datakey
Provides auto generating keys from objects. Uses "\x00" as default divider.

## get

````javascript
  var datakey = require('datakey');
  
  var keys = ['ID', 'name'],
	testData = { ID: 1, name: 'AA', result: 1000 },
	key;
	
	datakey.get(testData, keys); // retruns: '1\x00AA'
	
````

## levelup
converts data into a levelup batch transaction object
````javascript
  var datakey = require('datakey');
  
  var keys = ['ID', 'name'],
	testData = [{ ID: 1, name: 'AA', result: 56 },{ ID: 1, name: 'AB', result: 67 }],
	key;
	
	datakey.levelup(testData, keys)[0].key; // retruns: '1\x00AA'

	datakey.levelup(testData, keys)[1].value.name; // retruns: 'AB'
	
	//level up batch transaction (https://github.com/rvagg/node-levelup#batch)
	leveldb.batch(datakey.levelup(testData, keys));
	
````
