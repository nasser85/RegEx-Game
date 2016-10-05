module.exports = {
  width: 800,
  height: 600,
  timeLimit: 0,
  levelTimePad: 2000,
  minBombExpiration: 1000*120,
  desiredFps: 60,
  audioVolume: .5,
  customPlayerBombSeparate: 1,
  buttonTextStyle: { font: "15px gameFont", fill: "white", align: "center" },
  textStyle: {font: '20px gameFont', fill: 'magenta', boundsAlignH: 'center', boundsAlignV: 'middle'},
  mapConfig: {
    mapA: {
      tilemap: 'simpleCity_Layer1',
      tilesetImage: 'streetTiles',
      obstacles: {
        a: {
          tilemap: 'simpleCity_Layer2',
          tilesetImage: 'accessoryTiles',
          collision: [124,125,140,141,158,159,198,199,200]
        },
        b: {
          tilemap: 'simpleCity_Layer3',
          tilesetImage: 'carTiles',
          collision: [9,10,11,12,13,41,51,52,53,54,55,56,83,84,85]
        }
      }
    },
    mapB: {
      tilemap: 'parkCity_Layer1',
      tilesetImage: 'streetTiles',
      obstacles: {
        a: {
          tilemap: 'parkCity_Layer2',
          tilesetImage: 'accessoryTiles',
          collision: [98, 122, 123, 140, 141]
        }
      }
    }
  }
};
