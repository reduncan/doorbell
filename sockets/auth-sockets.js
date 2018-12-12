module.exports = function(io){
    io.on('connection', function(socket){
        //Socket Routes
        console.log("connected2œ");
        socket.on('emit-unlock', function(data){
            console.log("emit-unlock recieved");

            io.emit('emit-unlock', data);
        })
    })
}