const fs = require('fs');
const os = require('os');
const { exit } = require('process');
const { convert } = require("./convertHelper");
const { getObjectsFromFile } = require("./positinalFleHelper");

fs.readFile('./files/m80', 'utf8', (err, data) => {
    const mock = getMock();
        const eventObjects = convert(mock, getBindingMap());
        console.log(">>> mock <<<");
        console.log(mock);
        console.log(">>> events <<<");
        console.log(eventObjects);
});

function getBindingMap() {
    return  {
        header: 0,   //null for no header
        footer: -1,  //null for no footer
        bindings: [
                { destination: 'nun_ett', source: 'codact',             type: 'copy' },
                { destination: 'cod_typett', source: 'codtypett',       type: 'fixed'   , value: '2' },
                { destination: 'num_cen', source: 'numcen',             type: 'function', value: bind__num_bu},
                { destination: 'cod_etafinpal', source: 'codetafinpal', type: 'function', value: bind__cod_etafinpal},
            ]
        }            
};
function bind__cod_etafinpal(currentObject, header, footer, forthcomingObjectList) {
    if (currentObject.motmvt=='MR') {
        return currentObject.codpal;
    } else {
        return null;
    } 
}
function bind__num_bu(currentObject, header, footer, forthcomingObjectList) {
    const buList = [1, 2, 3, 4];
    if (buList.indexOf(currentObject.numbu) >= 0) {
        return currentObject.numbu;
    } else {
        return header.edisit;
    } 
}



function getMock() {
    return [
        {
            headerSampleField: 0,
            edisit: "edi"
        },
        {
            codact: 11,
            numcen: 21,
            codetafinpal: 31,
            motmvt: 'MR',
            codtypett: 41,
            codpal: 51,
            numbu: 61
        },
        {
            codact: 111,
            numcen: 121,
            codetafinpal: 131,
            motmvt: 'MR',
            codtypett: 141,
            codpal: 151,
            numbu: 5
        },
        {
            codact: 911,
            numcen: 921,
            codetafinpal: 931,
            motmvt: 'CC',
            codtypett: 941,
            codpal: 951,
            numbu: 4
        },
        {
            footerSampleField: 2
        }
    ];
}
