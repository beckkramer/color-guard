'use strict';

var sass = require('node-sass');
var path = require('path');
var fs = require('fs');

var options = {
  file: './src/scss/main.scss',
  outFile: './src/App.css',
  includePaths: [
    path.join(__dirname, 'node_modules') // npm
  ],
  outputStyle: 'compressed'
};

sass.render(options, function(err, result){
	if(err) {
		console.log('error:');
		console.log(err);
	}
	fs.writeFile('./src/App.css', result.css, function(err){
    if(!err){
      //file written on disk 
    }
  });
	console.log('result:');
  console.log(result);
});
