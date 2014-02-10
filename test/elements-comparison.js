var expect = require('chai').expect;
var cytoscape = require('../build/cytoscape.js', cytoscape);

describe('Collection style', function(){

  var cy;

  // test setup
  beforeEach(function(done){
    cytoscape({
      elements: {
        nodes: [
            { data: { id: 'n1' } },
            { data: { id: 'n2' } },
            { data: { id: 'n3' } }
        ],
        
        edges: [
            { data: { id: 'n1n2', source: 'n1', target: 'n2' } },
            { data: { id: 'n2n3', source: 'n2', target: 'n3' } }
        ]
      },
      ready: function(){
        cy = this;

        done();
      }
    });
  });


  it('eles.same()', function(){
    expect( cy.$('#n1').same( cy.$('#n1') ) ).to.be.true;
    expect( cy.$('#n1, #n2').same( cy.$('#n1, #n2') ) ).to.be.true;
    expect( cy.$('#n1').same( cy.$('#n1, #n2') ) ).to.be.false;
  });

  it('eles.anySame()', function(){
    expect( cy.$('#n1').anySame( cy.$('#n1') ) ).to.be.true;
    expect( cy.$('#n1, #n2').anySame( cy.$('#n1, #n2') ) ).to.be.true;
    expect( cy.$('#n1').anySame( cy.$('#n1, #n2') ) ).to.be.true;
    expect( cy.$('#n3').anySame( cy.$('#n1, #n3') ) ).to.be.true;
    expect( cy.$('#n1n2, #n3').anySame( cy.$('#n1, #n3') ) ).to.be.true;
  });

  it('eles.allAreNeighbors()', function(){
    expect( cy.$('#n2').allAreNeighbors( cy.$('#n1, #n3') ) ).to.be.true;
    expect( cy.$('#n1').allAreNeighbors( cy.$('#n2, #n3') ) ).to.be.false;
    expect( cy.$('#n1').allAreNeighbors( cy.$('#n1n2, #n2') ) ).to.be.true;
  });

  it('eles.is()', function(){
    expect( cy.$('#n1').is('node') ).to.be.true;
    expect( cy.$('#n1n2').is('edge') ).to.be.true;
    expect( cy.$('#n1n2, #n1').is('edge') ).to.be.true;
    expect( cy.$('#n1n2, #n1').is('node') ).to.be.true;
  });

  it('eles.allAre()', function(){
    expect( cy.$('#n1, #n2').allAre('node') ).to.be.true;
    expect( cy.$('#n1, #n1n2').allAre('node') ).to.be.false;
  });

});