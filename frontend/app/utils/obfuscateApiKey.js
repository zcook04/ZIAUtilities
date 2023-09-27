export const obfuscateApiKey = (timestamp, key) => {
    var high = timestamp.substring(timestamp.length - 6);
    var low = (parseInt(high) >> 1).toString();
    var apiKey = "";
    while (low.length < 6) {
        low = "0" + low;
    }
    for (var i = 0; i < high.length; i++) {
        apiKey += key.charAt(parseInt(high.charAt(i)));
    }
    for (var j = 0; j < low.length; j++) {
        apiKey += key.charAt(parseInt(low.charAt(j)) + 2);
    }
    return apiKey;
}