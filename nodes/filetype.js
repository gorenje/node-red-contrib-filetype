module.exports = function(RED) {
  function CorefiletypeFunctionality(config) {
    RED.nodes.createNode(this,config);

    var node = this;
    var cfg = config;

    const stream = require('stream')
    const buffer = require('buffer')
    
    node.on('close', function() {
      node.status({});
    });

    /* msg handler, in this case pass the message on unchanged */
    node.on("input", function(msg, send, done) {
      import('file-type').then(module => {

          if ( buffer.Buffer.isBuffer(msg.payload) ) {
            module.fileTypeFromBuffer(msg.payload).then( filetype => {
              msg.filetype = filetype
              send(msg);
              done()
            }).catch( err =>  {
              msg.error = err
              done(RED._("filetype.errors.parsingbuffer"), msg)
            })
          } else {
            if ( stream.isReadable(msg.payload) ) {
              module.fileTypeFromStream(msg.payload).then(filetype => {
                msg.filetype = filetype
                send(msg);
                done()
              }).catch(err => {
                msg.error = err
                done(RED._("filetype.errors.handlingstream"), msg)
              })
            } else {
                module.fileTypeFromBuffer(buffer.Buffer.from(msg.payload.toString('utf8'))).then(filetype => {
                  msg.filetype = filetype
                  send(msg);
                  done()
                }).catch(err => {
                  msg.error = err
                  done(RED._("filetype.errors.handlingstring"), msg)
                })
              }
            }

      }).catch ( err => {
        msg.error = err
        done(RED._("filetype.errors.general"), msg)
      });
    })
  }

  RED.nodes.registerType("filetype", CorefiletypeFunctionality);
}
