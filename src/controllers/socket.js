module.exports = function (io) {
  io.on('connection', function() {
    console.log('Socket connected !')
  });
}