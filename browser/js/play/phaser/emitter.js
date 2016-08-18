var Emitter = function (game, x, y, image) {

    let emitter = game.add.emitter(game.world.centerX, x, y);
    emitter.makeParticles(image);
    emitter.start(false, 3000, 100)
    return emitter

};
