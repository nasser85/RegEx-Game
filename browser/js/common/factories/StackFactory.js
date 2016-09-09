app.factory('StackFactory', function () {
  console.log('stackfactory');
  function Node (value, prev) {
    this.value = value;
    this.prev = prev || null;
  }

  function Stack () {
    this.top = null;
  }

  Stack.prototype.push = function (value) {
    if (!this.top) {
      this.top = new Node(value);
    } else {
      this.top = new Node(value, this.top);
    }
  };

  Stack.prototype.pop = function () {
    if (!this.top) {
      throw new Error('cannot pop from an empty stack');
    } else {
      var topNode = this.top;
      this.top = topNode.prev;
      return topNode;
    }
  };

  return Stack;
});
