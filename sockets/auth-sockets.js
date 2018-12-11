module.exports = function(io){
    io.on('connection', function(socket){
        //Socket Routes
        socket.on('unlock', function(data){
            io.emit('emit-unlock', data);
        })
    })
}