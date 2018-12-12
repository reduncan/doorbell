const socket = io();

//Photo capture
const input = document.querySelector('input[type="range"]');
let totalMatchFace = 0
var imageCapture;

navigator.mediaDevices.getUserMedia({ video: true })
  .then(mediaStream => {
    document.querySelector('video').srcObject = mediaStream;

    const track = mediaStream.getVideoTracks()[0];
    imageCapture = new ImageCapture(track);

    return imageCapture.getPhotoCapabilities();
  })
  .then(photoCapabilities => {
    const settings = imageCapture.track.getSettings();

    input.min = photoCapabilities.imageWidth.min;
    input.max = photoCapabilities.imageWidth.max;
    input.step = photoCapabilities.imageWidth.step;

    return imageCapture.getPhotoSettings();
  })
  .then(photoSettings => {
    input.value = photoSettings.imageWidth;
  })
  .catch(error => console.log(error.name || error));

function onTakePhotoButtonClick() {
  imageCapture.takePhoto({ imageWidth: input.value })
    .then(blob => createImageBitmap(blob))
    .then(imageBitmap => {
      drawCanvas(imageBitmap);
      run();
    })
    .catch(error => console.log(error));
}

document.querySelector('video').addEventListener('play', function () {
  document.querySelector('#takePhotoButton').disabled = false;
});

//Utils
function drawCanvas(img) {
  const canvas = document.querySelector('canvas');
  canvas.width = getComputedStyle(canvas).width.split('px')[0];
  canvas.height = getComputedStyle(canvas).height.split('px')[0];
  let ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
  let x = (canvas.width - img.width * ratio) / 2;
  let y = (canvas.height - img.height * ratio) / 2;
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height,
    x, y, img.width * ratio, img.height * ratio);
    
}


document.querySelector('#takePhotoButton').addEventListener('click', onTakePhotoButtonClick);

$('body').keyup(function(event) {
  keypress = event.keyCode;
  if ( keypress === 13 || keypress === 32 ) {
    takePhoto();
    setTimeout(onTakePhotoButtonClick, 3000);
    setTimeout(autoCapture, 3000);
  } 
});

const takePhoto = function () {
  $('header').hide();
  $('.ring').hide();
  $('#face').show();
  $('#face').css("display", "flex")
};

const autoCapture = function () {
  $('#takePhotoButton').hide();
  $('video').hide();
  $('.lds-ellipsis').removeClass('hide')
}

socket.on('emit-unlock', function () {
  console.log("I got the io")
  $('.denied').hide();
  $('.success').show();
});
