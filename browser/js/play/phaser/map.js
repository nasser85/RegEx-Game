var Map = function (game, x, y, image) {
    let randMap = this.getRandProp(RegexGame.gameConfig.mapConfig);
    let randObstacle = this.getRandProp(randMap.obstacles);

    this.map = game.add.tilemap(randMap.tilemap)
    this.map.addTilesetImage(randMap.tilesetImage)
    this.layer = this.map.createLayer(0);
    this.layer.resizeWorld();

    this.obstacles = game.add.tilemap(randObstacle.tilemap);
    this.obstacles.addTilesetImage(randObstacle.tilesetImage);
    this.obstacles.setCollision(randObstacle.collision);
    this.obstacleLayer = this.obstacles.createLayer(0);

};


Map.prototype = Object.create(Phaser.Sprite.prototype);
Map.prototype.constructor = Map;
Map.prototype.getRandProp = function(obj){
    let keys = Object.keys(obj);
    return obj[keys[Math.floor(Math.random() * keys.length)]];
}
