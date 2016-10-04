module.exports = function () {
  return {
    range: function (start, end) {
      return _.range(start, end + 1);
    },
    random: function (lower, upper) {
      return _.random(lower, upper);
    },
    randomRange: function (lower, upper, minLength, maxLength) {
      do {
        var m = this.random(lower, upper);
        var n = this.random(lower, upper);
        var lowerIndex = Math.min(m, n);
        var upperIndex = Math.max(m, n);
        var length = upperIndex - lowerIndex + 1;
      } while (length < minLength || length > maxLength);

      return this.range(lowerIndex, upperIndex);
    },
    difference: function (arrA, arrB) {
      return _.difference(arrA, arrB);
    },
    fromCodePoint: function (num) {
      return String.fromCodePoint(num);
    },
    arrayOfCharacters: function (arrCodePoints) {
      return arrCodePoints.map(this.fromCodePoint);
    },
    stringOfCharacters: function (arrCodePoints) {
      return this.arrayOfCharacters(arrCodePoints).join('');
    },
    firstElement: function (arr) {
      return arr[0];
    },
    lastElement: function (arr) {
      return arr[arr.length - 1];
    },
    getData: function (res) {
      return res.data;
    }
  };
};
