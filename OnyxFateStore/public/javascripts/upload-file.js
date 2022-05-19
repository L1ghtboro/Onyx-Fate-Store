//Create function that can read file from user desktop (profile-page.pug)

//Convert file to string

//Send string to index.ts (save to db)

var input = document.querySelector('input');
var preview = document.querySelector('.preview');

input.style.opacity = 0;

input.addEventListener('change', updateImageDisplay);

let getImage = {
    url: null,
    size: null
};

function updateImageDisplay() {
    while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }

    var curFiles = input.files;
    if (curFiles.length === 0) {
        var para = document.createElement('p');
        preview.appendChild(para);
    } else {
        for (var i = 0; i < curFiles.length; i++) {
            if (validFileType(curFiles[i])) {
                var image = document.createElement('img');
                image.src = window.URL.createObjectURL(curFiles[i]);

                getImage.url = image.src;
                getImage.size = returnFileSize(curFiles[i].size);

                document.getElementById('pictureurl').value = getImage.url;
                document.getElementById('picturesize').value = getImage.size;

                console.log(document.getElementById('pictureurl').value);

            } else {

            }

        }
    }
}

var fileTypes = [
    'image/jpeg',
    'image/pjpeg',
    'image/png'
]

function validFileType(file) {
    for (var i = 0; i < fileTypes.length; i++) {
        if (file.type === fileTypes[i]) {
            return true;
        }
    }

    return false;
}

function returnFileSize(number) {
    if (number < 1024) {
        return number + 'bytes';
    } else if (number > 1024 && number < 1048576) {
        return (number / 1024).toFixed(1) + 'KB';
    } else if (number > 1048576) {
        return (number / 1048576).toFixed(1) + 'MB';
    }
}

console.log(getImage);