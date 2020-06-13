(function () {
    let arrayType = Array,
        functionStr = 'function',
        objectStr = 'object',
        CRC32_TABLE;
    if (typeof Uint32Array === functionStr) {
        arrayType = Uint32Array;
    }

    function stringToArray(string) {
        let l = string.length,
            bytes = new arrayType(l),
            i = 0;
        for (; i < l; i++) {
            bytes[i] = string.charCodeAt(i);
        }
        return bytes;
    }

    function genCRC32Table() {
        let i = 0, c = 0, b = 0;
        CRC32_TABLE = new arrayType(256);
        for (; i < 256; i++) {
            c = i;
            b = 8;
            while (b--) {
                c = (c >>> 1) ^ ((c & 1) ? 0xEDB88320 : 0);
            }
            CRC32_TABLE[i] = c;
        }
    }

    function crc32(arr) {
        let values = typeof arr === 'string' ? stringToArray(arr) : (arr.models || arr),
            crc = -1,
            i = 0,
            l = values.length,
            isObjects = typeof values[0] === objectStr,
            id = 0;
        if (CRC32_TABLE === undefined) {
            genCRC32Table();
        }
        for (; i < l; i++) {
            id = isObjects ? (values[i].id >>> 0) : values[i];
            crc = CRC32_TABLE[(crc ^ id) & 0xFF] ^ (crc >>> 8);
        }
        //bitflip then cast to 32-bit unsigned
        return (~crc >>> 0).toString(16);
    }

    function originData() {
        return document.querySelector("#data").value;
    }

    function setOutput(data) {
        document.querySelector("#output").value = data;
    }
    function setInput(data) {
        document.querySelector("#data").value = data;
    }
    function sign() {
        let data = originData();
        data = encodeURIComponent(data);
        let b64 = btoa(data);
        setOutput(crc32(data) + b64);
    }

    function regSign() {
        let button = document.querySelector("#gen");
        button.addEventListener("click", sign);
        setInput("Hello World!")
    }

    regSign();
})();