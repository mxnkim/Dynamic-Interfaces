function init() {
    if(!window.audioContext){
        audioContext = new webkitAudioContext;
    } else {
        throw new Error('AudioContext not supported. :(');
    }
}

//audio object
function sound(source){
    var that = this;
    that.source = source;
    that.buffer = null;
    that.isLoaded = false;

    var getSound = new XMLHttpRequest();
    getSound.open('GET', that.source, 'true');
    getSound.responseType = 'arraybuffer';
    getSound.onload = function(){
        audioContext.decodeAudioData(getSound.response, function(buffer){
            that.buffer = buffer;
            that.isLoaded = true;
        });
    }
    getSound.send();
}

sound.prototype.play = function(){
    if(this.isLoaded == true){
        var playSound = audioContext.createBufferSource();
        playSound.buffer = this.buffer;
        playSound.connect(audioContext.destination);
        playSound.noteOn(0);
    }

}


window.onload = init;
