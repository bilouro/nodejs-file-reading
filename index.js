const fs = require('fs');
const os = require('os');

fs.readFile('./files/m80', 'utf8', (err, data) => {
    const dataObjects = getObjectsAndEventsFromFile(data);
    console.log(">>>> data objects <<<")
    console.log(dataObjects);

    // const adjustmentList = dataObjects.filter(obj => obj.eventType == 'A');
    // const blockedList    = dataObjects.filter(obj => obj.eventType == 'B');
    // const unblockedlist  = dataObjects.filter(obj => obj.eventType == 'U');

    // const stockAdjustmentHasBeenDoneEvents = createStockAdjustmentHasBeenDoneEvents(adjustmentList);
    // const productHasBeenBlockedEvents = createProductHasBeenBlockedEvents(blockedList);
    // const productHasBeenUnblockedEvents = createProductHasBeenUnblockedEvents(unblockedlist);
    // console.log(">>>> Adjustments events <<<")
    // console.log(stockAdjustmentHasBeenDoneEvents);

    //Perform Insert
});

function getObjectsAndEventsFromFile(data) {
    const dataObjectsArray = [];  
    const eventsArray = [];  
    const lines = data.split(os.EOL);
    let eventDate = 0;

    let dataLineReceivedCount = 0;
    for (i = 0; i < lines.length; i++) {
        let line = lines[i];
        switch (line.substr(0, 2)) {
            case '00':
                //0020201110
                eventDate = processLine00(line);
                break;
            case '01':
            case '02':
            case '03':
                //01123123B40
                dataObjectsArray.push( processLine01(line, eventDate) );
                dataLineReceivedCount++;
                break;
            case '99':
                //990000003
                processLine99(line, dataLineReceivedCount);
                break;
            default:
                throw `lineType not specified in documentation ${line.substr(0, 2)}`;
        }

    }
    return dataObjectsArray;
}
function processLine99(line, dataLineReceivedCount) {
    const dataLinesSentCount = parseInt(line.substring(2, 9));
    if (dataLinesSentCount != dataLineReceivedCount) {
        console.log(`quantidade errada de itens. Contados ${dataLineReceivedCount} informados no rodapé ${dataLinesSentCount}`);
        throw 'quantidade errada';
    }
}

function processLine01(line, eventDate)  {
    const lineMapping = [
        {name: 'productNo',  initial_position:  2, length:  6, type: 'integer' },
        {name: 'eventType',  initial_position:  8, length:  1, type: 'string'  },
        {name: 'eventCode',  initial_position:  9, length:  2, type: 'string'  },
        {name: 'eventNumber',  fixedValue: '99', type: 'fixed'  },
        {name: 'eventClass',  fixedValue: 'AAA', type: 'fixed'  },
    ];

    let dataObject = getDataFromFileLineByMapping(lineMapping, line);
    dataObject.eventDate = eventDate;

    return dataObject;
}

function getDataFromFileLineByMapping(lineMapping, line) {
    let dataObject = {};
    lineMapping.map((attribute) => {

        switch (attribute.type) {
            case 'fixed':
                dataObject[attribute.name] = attribute.fixedValue;
                break;
            default:
                dataObject[attribute.name] =  line.substring(attribute.initial_position, attribute.initial_position + attribute.length)
                break;
        }
           
    });
    return dataObject;
}

function processLine00(line) {
    const year = line.substring(2, 6);
    const month = line.substring(6, 8);
    const day = line.substring(8, 10);
    return new Date(year, month, day);
}


function createStockAdjustmentHasBeenDoneEvents(adjustmentList) {
    const stockAdjustmentHasBeenDoneEvents = [];
    adjustmentList.map( adjustment => {

        stockAdjustmentHasBeenDoneEvents.push({
            nun_bu: adjustment.nunbu,
            cod_typett: 2,
            nun_ett:adjustment.codact,
            cod_typmvt:adjustment.codmvt,
        })
    })
    return stockAdjustmentHasBeenDoneEvents;
}
