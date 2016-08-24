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
  testCase: function (content, match) {
    return { content: content, match: match };
  },
  randomFromArr: function (arr) {
    var index = this.getRandomIntInclusive(0, arr.length - 1);

    return arr[index];
  }
};




