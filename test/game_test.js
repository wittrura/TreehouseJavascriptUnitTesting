var expect = require('chai').expect;

// x in front of describe or it can flag for pending specs
describe('GAME INSTANCE FUNCTIONS', function(){

  describe('checkGameStatus', function(){
    var checkGameStatus = require('../game_logic/game_instance.js').checkGameStatus;

    // pending test spec, does not include callback
    it('should tell me when the game is over', function() {
      var players = [
        {
          ships: [
            {
              locations: [[0,0]],
              damage: [[0,0]]
            }
          ]
        }
      ];
      var actual = checkGameStatus(players);
      expect(actual).to.be.false;
    });
  });
});
