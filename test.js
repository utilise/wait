var expect = require('chai').expect
  , wait = require('./')
  , emitterify = require('emitterify')

describe('wait', function() {

  it('should wait for condition', function(done) {
    var body = emitterify([])
      , msg = {}
      , called = 0
      , fn = function(){ called++ }

    body.once('change', wait(function(){ return msg.id })(fn))

    setTimeout(function(){ 
      expect(called).to.eql(0)
    }, 25)

    setTimeout(function(){ 
      body.push(msg)
      body.emit('change')
      expect(called).to.eql(0)
    }, 50)

    setTimeout(function(){ 
      msg.id = true;  
      body.emit('change')
      expect(called).to.eql(1)
    }, 75)

    setTimeout(function(){ 
      body.emit('change'); 
      expect(called).to.eql(1)
      done()
    }, 100)
  })

})