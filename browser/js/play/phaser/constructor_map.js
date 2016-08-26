//selects random base map from library with associated obstacle layer
var Map = function (game, x, y, image) {
    //get random map and obstacle set
    let randMap = this.getRandProp(RegexGame.gameConfig.mapConfig);
    let randObstacle = this.getRandProp(randMap.obstacles);

    //add map to game
    this.map = game.add.tilemap(randMap.tilemap)
    this.map.addTilesetImage(randMap.tilesetImage)
    this.layer = this.map.createLayer(0);

    //add obstacles over map
    this.obstacles = game.add.tilemap(randObstacle.tilemap);
    this.obstacles.addTilesetImage(randObstacle.tilesetImage);
    this.obstacles.setCollision(randObstacle.collision);
    this.obstacleLayer = this.obstacles.createLayer(0);
};

Map.prototype = Object.create(Phaser.Sprite.prototype);
Map.prototype.constructor = Map;

//custom method for selecting random maps/obstacles
Map.prototype.getRandProp = (obj) => {
    let keys = Object.keys(obj);
    return obj[keys[Math.floor(Math.random() * keys.length)]];
}
