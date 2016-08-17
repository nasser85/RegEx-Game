var Map = function (game, x, y, image) {

    Phaser.Sprite.call(this, game, x, y, image);

    game.add.existing(this);
};

Map.prototype = Object.create(Phaser.Sprite.prototype);
Map.prototype.constructor = Map;

Map.prototype.update = function() {};
