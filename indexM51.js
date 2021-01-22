const fs = require('fs');
const os = require('os');
const { exit } = require('process');
const { getObjectsFromFile } = require("./positionalFileHelper");
const { Converter } = require("./convertHelper");
const { getFileMapping } = require("./mappers/m51FileMapping");
const { uniquifyList } = require("./uniquifyHelper");

function get5100UniqueValue(obj){
  return obj.cliliv;
}

fs.readFile('./files/358M5121010700153307.txt', 'utf8', (err, data) => {
    const dataObjects = getObjectsFromFile(data, getFileMapping()); //salvar esta lista no banco.
    console.log('======================================================');
    console.log('=         DATA OBJECTS                               =');
    console.log('======================================================');
    console.log(dataObjects);

    const list5100 = dataObjects.filter(obj => obj.codexc == '51' && obj.scoexc == 0); //nao salvar esta lista no banco
    console.log('======================================================');
    console.log('=         FILTER 51.00                               =');
    console.log('======================================================');
    console.log(list5100);

    const uniqueList = uniquifyList(list5100, ['children5101', 'children5120', 'children5199'], get5100UniqueValue);  //processar essa lista no converter.
    console.log('======================================================');
    console.log('=         DISTINCT                                   =');
    console.log('======================================================');
    console.log(uniqueList);
    
});

