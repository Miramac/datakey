# datakey
Provides auto generating keys from objects. Uses '\x00' (null) as default divider.

## .get(data, keys)

````javascript
	var Datakey = new require('datakey');
  
	var datakey1 = new Datakey(),
	keys = ['ID', 'name'],
	testData = { ID: 1, name: 'AA', result: 1000 },
	key;
	
	datakey.get(testData, keys); // retruns: '1\x00AA'

	var datakey2 = new Datakey({divider: '!'});
	datakey.get(testData, keys); // retruns: '1!AA'
	
````

## .levelup(data, keys)
converts data into a levelup batch transaction object
````javascript
	var Datakey = new require('datakey');
  
	var datakey = new Datakey(),
	keys = ['ID', 'name'],
	testData = [{ ID: 1, name: 'AA', result: 56 },{ ID: 1, name: 'AB', result: 67 }],
	key;
	
	datakey.levelup(testData, keys)[0].key; // retruns: '1\x00AA'

	datakey.levelup(testData, keys)[1].value.name; // retruns: 'AB'
	
	//level up batch transaction (https://github.com/rvagg/node-levelup#batch)
	leveldb.batch(datakey.levelup(testData, keys));
	
````
