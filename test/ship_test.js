var expect = require('chai').expect;

describe('SHIP METHODS', function(){
  describe('check for ship', function(){
    var checkForShip = require('../game_logic/ship_methods').checkForShip;
    var player;

    before(function(){
      player = {
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
    });

    it('should correctly report no ship at a given players coordinates aka miss', function(){
      expect(checkForShip(player, [9, 9])).to.be.false;
    });

    it('should correctly return a ship object when it is at guessed coordinates aka hit', function(){
      expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
    });

    it('should handle ships located at more than one coordinate', function(){
      // mutliple expects not always a good idea because it may not be clear what a test is proving
      expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
      expect(checkForShip(player, [0, 1])).to.deep.equal(player.ships[0]);
      expect(checkForShip(player, [9, 9])).to.be.false;
    });

    it('should handle checking multiple ships', function(){
      // mutliple expects not always a good idea because it may not be clear what a test is proving
      expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
      expect(checkForShip(player, [0, 1])).to.deep.equal(player.ships[0]);
      expect(checkForShip(player, [1, 0])).to.deep.equal(player.ships[1]);
      expect(checkForShip(player, [1, 1])).to.deep.equal(player.ships[1]);
      expect(checkForShip(player, [2, 3])).to.deep.equal(player.ships[2]);
      expect(checkForShip(player, [9, 9])).to.be.false;
    });
  });

  describe('check for damage to ships', function(){
    var damageShip = require('../game_logic/ship_methods').damageShip;

    it('should register damage on given ship at given locations', function(){
      var ship = {
        locations: [[0, 0]],
        damage: []
      };

      damageShip(ship, [0, 0]);

      expect(ship.damage[0]).to.not.be.empty;
      expect(ship.damage[0]).to.deep.equal([0, 0]);
    });
  });

  describe('fire a shot at an opposing player', function(){
    var fireAtLocation = require('../game_logic/ship_methods').fireAtLocation;
    var player2;

    beforeEach(function() {
      player2 = {
        ships: [
          {
            locations: [[0, 0]],
            damage: []
          }
        ]
      }
    });

    // reference for teardown, to be used with databases
    // after(function() {
    //   console.log('entire test suite completed');
    // });
    //
    // afterEach(function() {
    //   console.log('one unit test completed');
    // });

    it('should add to ship damage array at guessed coordinates on confirmed hit', function(){
      var player1Guess = [0, 0];
      fireAtLocation(player2, player1Guess);

      expect(player2.ships[0].damage[0]).to.deep.equal(player1Guess);
    });

    it('should confirm if the guess is a miss', function(){
      var player1Guess = [0, 1];

      expect(fireAtLocation(player2, player1Guess)).to.be.false;
    });

    it('should NOT record damage if there is no ship at the guessed coordinate', function () {
      var player1Guess = [1, 1];
      fireAtLocation(player2, player1Guess);

      expect(player2.ships[0].damage).to.be.empty;
    });
  });
});
