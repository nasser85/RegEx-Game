const path = require('path');
const fs = require('fs');
const lodash = require('lodash');

const source = path.join(__dirname, './parsed.html');

var ngClassRe = /ng-class/gi;

var classRe = /\sclass=["']([^"']+)["']/gi;
var arrClassRe = [];



/*
  ng-class

  blurry
  not-blurry
  magictime
  foolishOut
*/
fs.readFile(source, 'utf8', (err, data) => {
  if (err) throw err;

  var result = [];

  data.split('\n').forEach((rowOfHTML) => {
    if (ngClassRe.test(rowOfHTML)) result.push(rowOfHTML);
  });

  fs.writeFile(path.join(__dirname, './css-helper/ngClass.txt'), result.join('\n'), 'utf8', () => console.log('done!'));
});

// 'regular' classes
fs.readFile(source, 'utf8', (err, data) => {
  if (err) throw err;

  var arr = [];

  while ((arrClassRe = classRe.exec(data)) !== null) {
    arrClassRe[1].split(' ').forEach(css => arr.push(css));
  }

  var result = lodash.uniq(arr).sort().join('\n');

  fs.writeFile(path.join(__dirname, './css-helper/class.txt'), result, 'utf8', () => console.log('done!'));
});


