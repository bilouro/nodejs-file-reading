const fs = require('fs');
const os = require('os');

fs.readFile('./files/m80', 'utf8', (err, data) => {
    const dataObjects = getObjectsAndEventsFromFile(data);
    // const events = createEventsFromObjects(objectsFromFile);
    const blockedList    = dataObjects.filter(obj => obj.eventType == 'B');
    const unblockedlist  = dataObjects.filter(obj => obj.eventType == 'U');
    const adjustmentList = dataObjects.filter(obj => obj.eventType == 'A');

    const stockAdjustmentHasBeenDoneEvents = createStockAdjustmentHasBeenDoneEvents(adjustmentList);
    // const productHasBeenBlockedEvents = createProductHasBeenBlockedEvents(blockedList);
    // const productHasBeenUnblockedEvents = createProductHasBeenUnblockedEvents(unblockedlist);
    console.log(stockAdjustmentHasBeenDoneEvents);

    //Performe Insert
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
                // blocking
                //01123123B40
                dataObjectsArray.push( processLine01(line, eventDate) );
                dataLineReceivedCount++;
                break;
            case '02':
                // unblocking
                //02123123U                
                dataObjectsArray.push( processLine02(line, eventDate));
                dataLineReceivedCount++;
                break;
            case '03':
                // adjustment
                // 03123123A40objeto caiu quando estava sendo manipulado
                dataObjectsArray.push( processLine03(line, eventDate) );
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

function processLine03(line, eventDate) {
    return {
            productNo: line.substring(2, 8),
            eventDate: eventDate,
            eventType: line.substring(8, 9),
            eventCode: line.substring(9, 11),
            eventDesc: line.substring(11, 53),
            nunbu: 80,  //mock
            codact: 13, //mock
            codmvt:11, //mock
        };
    }

function processLine02(line, eventDate) {
    return {
        productNo: line.substring(2, 8),
        eventDate: eventDate,
        eventType: line.substring(8, 9),
    };
}

function processLine01(line, eventDate)  {
    return {
            productNo: line.substring(2, 8),
            eventDate: eventDate,
            eventType: line.substring(8, 9),
            eventCode: line.substring(9, 11),
        };
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
