function loadFile(event, inputId) {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file.type.startsWith('image/')) {
        reader.onload = function(event) {
            const arrayBuffer = event.target.result;
            const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
            document.getElementById(inputId).value = CryptoJS.SHA256(wordArray).toString();
        };
        reader.readAsArrayBuffer(file);
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
