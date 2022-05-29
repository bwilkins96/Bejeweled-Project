const { expect } = require('chai');

const Bejeweled = require("../class/bejeweled.js");

describe ('Bejeweled', function () {

  let testGrid;

  beforeEach(function() {
    testGrid = [
      [ 'a', 'y', 'y', 'y', 'e', 'i', 'a', 'a' ],
      [ 'e', 'a', 'i', 'u', 'a', 'i', 'y', 'a' ],
      [ 'i', 'e', 'e', 'e', 'u', 'u', 'o', 'u' ],
      [ 'a', 'i', 'i', 'e', 'a', 'u', 'y', 'e' ],
      [ 'u', 'e', 'e', 'y', 'a', 'o', 'o', 'a' ],
      [ 'i', 'i', 'i', 'u', 'e', 'e', 'e', 'y' ],
      [ 'u', 'o', 'y', 'y', 'i', 'y', 'a', 'u' ],
      [ 'i', 'o', 'e', 'o', 'i', 'u', 'o', 'u' ]
    ];

  });

  // Add tests for setting up a basic board
  it ("should initialize an 8x8 board with a random assortment of vowels", function() {
    expect(Bejeweled.getRandomVowel).to.exist;
    expect(Bejeweled.setGrid).to.exist;
    expect(Bejeweled.setGrid().length).to.equal(8);
  });

it ("should correctly recognize 3-in-a-row matches", function() {
  expect(Bejeweled.checkForMatches(testGrid).length).to.equal(4)
});

it ("should drop items after a match and recognize combos caused by the dropped items", function() {
  Bejeweled.processMatches(testGrid);
  expect(testGrid).to.deep.equal([
    [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'a' ],
    [ 'a', ' ', ' ', ' ', 'e', 'i', 'a', 'a' ],
    [ 'e', ' ', ' ', 'u', 'a', 'i', 'y', 'u' ],
    [ 'i', 'a', 'i', 'e', 'u', 'u', 'o', 'e' ],
    [ 'a', 'i', 'i', 'y', 'a', 'u', 'y', 'a' ],
    [ 'u', 'e', 'e', 'u', 'a', 'o', 'o', 'y' ],
    [ 'u', 'o', 'y', 'y', 'i', 'y', 'a', 'u' ],
    [ 'i', 'o', 'e', 'o', 'i', 'u', 'o', 'u' ]
  ]);
})

it ("should recognize when there are no possible moves", function() {
  let testGrid2 = [
    [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'a' ],
    [ 'a', ' ', ' ', ' ', 'e', 'i', 'a', 'a' ],
    [ 'e', ' ', ' ', 'u', 'a', 'i', 'y', 'u' ],
    [ 'i', 'a', 'i', 'e', 'u', 'u', 'o', 'e' ],
    [ 'a', 'i', 'i', 'y', 'a', 'u', 'y', 'a' ],
    [ 'u', 'e', 'e', 'u', 'a', 'o', 'o', 'y' ],
    [ 'u', 'o', 'y', 'y', 'i', 'y', 'a', 'u' ],
    [ 'i', 'o', 'e', 'o', 'i', 'u', 'o', 'u' ]
  ];

  expect(Bejeweled.checkForMatches(testGrid2).length).to.equal(0);
});

});
