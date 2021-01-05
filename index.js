const fs = require('fs');
const os = require('os');
const { exit } = require('process');
const { getObjectsFromFile } = require("./positinalFleHelper");

fs.readFile('./files/m80', 'utf8', (err, data) => {
    const dataObjects = getObjectsFromFile(data, getFileMapping());
    console.log(dataObjects);
});

/**
 *  Insert a empty list of attributes to ignore a line of file: 
 *                ["00", []], 
 */
function getFileMapping() {
    return {
        discriminatorInitialPostion : 0,
        discriminatorLenght : 2,
        lines : new Map(
            [
                ["00", [
                    { name: 'codExc', initialPosition: 0, length: 2, type: 'string', required: true },
                    { name: 'eventDate', initialPosition: 2, length: 8, type: 'date', required: true, dateFormat: 'YYYYMMDD' },
                ]], 
                ["01", [  
                    { name: 'codExc', initialPosition: 0, length: 2, type: 'string', required: true },
                    { name: 'productNo', initialPosition: 2,  length: 6,  type: 'integer', required: true },
                    { name: 'eventType', initialPosition: 8,  length: 1,  type: 'string', required: true },
                    { name: 'eventCode', initialPosition: 9,  length: 2,  type: 'integer', required: false },
                    { name: 'eventDesc', initialPosition: 11, length: 42, type: 'string', required: false },
                ]], 
                ["99", [  
                    { name: 'codExc', initialPosition: 0, length: 2, type: 'string', required: true },
                    { name: 'totalLinesSent', initialPosition: 2, length: 7, type: 'integer', required: true },
                ]], 
            ]            
        )
    };
};
