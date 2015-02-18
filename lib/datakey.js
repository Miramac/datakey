//
// provides auto generating keys from objects
//
// rows : [ { ID: 1:, name: 'UnitA', result: 56 }, { ID: 2:, name: 'UnitB', result: 67} ]
// keys : [ 'ID', 'name' ]
// -> {'1\x00UnitA': { ID: 1:, name: 'UnitA', result: 56 }, '1\x00UnitB': { ID: 1:, name: 'UnitB', result: 67 }, ... }

function Datakey(options) {
	options = (options) ? options : {};
	options.divider = (options.divider) ? options.divider : '\x00';
	
	var datakey = {};
	
	datakey.get = function(data, keys) {
		var i, key = '';
		for(i=0; i<keys.length; i++){
			key += ((i>0) ? options.divider : '') + data[keys[i]];
		}
		return key;
	};
	
	//converts data for insert into level db with auto generating keys. 
	datakey.levelup = function(rows, keys, cb) {
		rows = (keys.length) ? rows : [rows];
		if (!keys && !keys.length) return;
		var i,j
        , data = []
		;
		for (i=0; i<rows.length; i++) {
			data.push({type: 'put', key: datakey.get(rows[i], keys), value: rows[i] }); 
		}
		return data
	};
	
	return datakey;
}

module.exports = Datakey();
