describe('takePhoto', function () {

    it('should remove the header/ring div and display the face div', function () {

        var e = jQuery.Event("keyup", { keyCode: 32 });
        jQuery("body").trigger(e);

        expect($('header').hasClass('hide')).to.equal(true);
        expect($('.ring').hasClass('hide')).to.equal(true);
        expect($('#face').hasClass('show')).to.equal(true);
    });

    it('should remove the header/ring div and display the face div', function () {

        var e = jQuery.Event("keyup", { keyCode: 13 });
        jQuery("body").trigger(e);

        expect($('header').hasClass('hide')).to.equal(true);
        expect($('.ring').hasClass('hide')).to.equal(true);
        expect($('#face').hasClass('show')).to.equal(true);
    });
});

describe('autoCapture', function () {

    it('should remove the video and show the canvas', function () {

        setTimeout(function () {
            expect($('video').hasClass('hide')).to.equal(true);
            expect($('#takePhotoButton').hasClass('hide')).to.equal(true);
        }, 3000)
    })
})