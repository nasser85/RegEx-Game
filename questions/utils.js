'use strict';

module.exports = {
  randomIntInclusive: function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  charString: function (length, char) {
    return Array(length).fill(1).map(e => char).join('');
  },
  randomFromArr: function (arr) {
    var index = this.randomIntInclusive(0, arr.length - 1);

    return arr[index];
  },
  randomCharFromString: function (str) {
    return str.charAt(this.randomIntInclusive(0, str.length - 1));
  },
  stringSplice: function (strTarget, index, str) {
    return strTarget.slice(0, index) + str + strTarget.slice(index);
  }
};




