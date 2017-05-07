var expect = require('chai').expect;

describe('check for ship', function(){
  var checkForShip = require('../game_logic/ship_methods').checkForShip;
  var player = {
    ships: [
      {
        locations: [[0, 0], [0, 1]]
      },
      {
        locations: [[1, 0], [1, 1]]
      },
      {
        locations: [[2, 0], [2, 1], [2, 2], [2, 3]]
      }
    ]
  };

  it('should correctly report no ship at a given players coordinates aka miss', function(){
    expect(checkForShip(player, [9, 9])).to.be.false;
  });

  it('should correctly report a ship is at a given players coordinates aka hit', function(){
    expect(checkForShip(player, [0, 0])).to.be.true;
  });

  it('should handle ships located at more than one coordinate', function(){
    // mutliple expects not always a good idea because it may not be clear what a test is proving
    expect(checkForShip(player, [0, 0])).to.be.true;
    expect(checkForShip(player, [0, 1])).to.be.true;
    expect(checkForShip(player, [9, 9])).to.be.false;
  });

  it('should handle checking multiple ships', function(){

    // mutliple expects not always a good idea because it may not be clear what a test is proving
    expect(checkForShip(player, [0, 0])).to.be.true;
    expect(checkForShip(player, [0, 1])).to.be.true;
    expect(checkForShip(player, [1, 0])).to.be.true;
    expect(checkForShip(player, [1, 1])).to.be.true;
    expect(checkForShip(player, [2, 3])).to.be.true;
    expect(checkForShip(player, [9, 9])).to.be.false;
  });
});

describe('check for damage to ships', function(){
  var damageShip = require('../game_logic/ship_methods').damageShip

  it('should register damage on given ship at given locations', function(){
      var ship = {
        locations: [[0, 0]],
        damage: []
      };
      damageShip(ship, [0, 0]);

      expect(ship.damage).to.not.be.empty;
      expect(ship.damage[0]).to.deep.equal([0, 0]);
  });

});
