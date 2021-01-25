const fs = require('fs');
const os = require('os');
const { exit } = require('process');
const { getObjectsFromFile } = require("./positionalFileHelper");
const { Converter } = require("./convertHelper");
const { getFileMapping } = require("./mappers/m51FileMapping");
const { getBindingMap } = require('./mappers/m51BindMapping');
const { uniquifyList } = require("./uniquifyHelper");

function get5100UniqueValue(obj){
  let found = false;
  let foundValue = null;
  obj.children5105.forEach(({valrub1, valrub2, valrub3, valrub4, codrub1, codrub2, codrub3, codrub4}) => {
    if (!found) {
      [codrub1, codrub2, codrub3, codrub4].forEach((codrub, index) => {
        if (codrub === 'CIRL') {
          foundValue = [valrub1, valrub2, valrub3, valrub4][index];
          found = true;
        };
      });
    }
  })

  return foundValue ? obj.cliliv + foundValue : obj.cliliv;
}

fs.readFile('./files/358M5121010700153317.txt', 'utf8', (err, data) => {
    const dataObjects = getObjectsFromFile(data, getFileMapping());

    // filter by 51.00 lines
    const list5100 = dataObjects.filter(obj => obj.codexc == '51' && obj.scoexc == 0);

    const uniqueList = uniquifyList(list5100, ['children5101', 'children5105', 'children5130', 'children5199'], get5100UniqueValue);

    // add header and footer to new list
    uniqueList.unshift(dataObjects[0]);
    uniqueList.push(dataObjects[dataObjects.length - 1]);
    
    const eventObjects = new Converter().convert(uniqueList, [getBindingMap()], { header: 0, footer: -1});
    console.log(JSON.stringify(eventObjects, null, 2));
});
