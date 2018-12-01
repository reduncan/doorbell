describe('takePhoto', function() {

    it('should remove the header/ring div and display the face div', function() {

        var e = jQuery.Event('keypress');
        e.which = 32;
        $(document).trigger(e);
        
        expect($('header')).have.class('hide');
        expect($('.ring')).have.class('hide');
        expect($('#face')).have.class('show');
    });

    it('should remove the header/ring div and display the face div', function() {

        var e = jQuery.Event('keypress');
        e.which = 13;
        $(document).trigger(e);
        
        expect($('header')).have.class('hide');
        expect($('.ring')).have.class('hide');
        expect($('#face')).have.class('show');
    });
});

describe('autoCapture', function() {

    it('should remove the video and show the canvas', function() {


        expect($('video')).have.class('hide');
        expect($('#takePhotoButton')).have.class('hide');
    })
})