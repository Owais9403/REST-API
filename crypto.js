var cryptr = require("cryptr");
cryptr = new cryptr("a");
const encrptstring = cryptr.encrypt("localhost");
const decrptstring = cryptr.decrypt(encrptstring);
console.log(encrptstring);
console.log(decrptstring);
