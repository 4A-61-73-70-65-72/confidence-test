function loadFile(event, inputId) {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file.type.startsWith('image/')) {
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                // scale down the image
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const maxSize = 100;  // max size for either width or height
                const ratio = maxSize / Math.max(img.width, img.height);
                canvas.width = img.width * ratio;
                canvas.height = img.height * ratio;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // get the image data
                const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

                // convert the data to a word array
                const wordArray = CryptoJS.lib.WordArray.create(data);

                // hash the word array and set the result
                document.getElementById(inputId).value = CryptoJS.SHA256(wordArray).toString();
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        reader.onload = function(event) {
            const text = event.target.result;
            const plainText = text.replace(/\s+/g, ' ');
            document.getElementById(inputId).value = CryptoJS.SHA256(plainText).toString();
        };
        reader.readAsText(file);
    }
}

function next() {
    document.getElementById('screen1').classList.add('hidden');
    document.getElementById('screen2').classList.remove('hidden');
}

function compareHashes() {
    const input1 = document.getElementById('input1').value;
    const input2 = document.getElementById('input2').value;
    const hash1 = CryptoJS.SHA256(input1);
    const hash2 = CryptoJS.SHA256(input2);
    
    if (hash1.toString() === hash2.toString()) {
        document.getElementById('output').innerText = "Hashes are the same: " + hash1;
    } else {
        document.getElementById('output').innerText = "Hashes are different: \nHash 1: " + hash1 + "\nHash 2: " + hash2;
    }
}

function reset() {
    document.getElementById('input1').value = '';
    document.getElementById('input2').value = '';
    document.getElementById('output').innerText = '';
    document.getElementById('screen1').classList.remove('hidden');
    document.getElementById('screen2').classList.add('hidden');
    document.getElementById('form1').reset();
    document.getElementById('form2').reset();
}
