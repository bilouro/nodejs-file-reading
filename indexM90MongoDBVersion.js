const fs = require('fs');
const os = require('os');
const moment = require('moment');
const { exit } = require('process');
const { getObjectsFromFile } = require("./positionalFileHelper");
const { Converter } = require("./convertHelper");
const { getFileMapping } = require("./mappers/m90FileMapping");
const { getBindingMap, getNotificationBindingMap } = require("./mappers/m90BindMapping");
const mongoService = require('./mongo');


const start = async() => {
    const PluginInfos = {
        name: '', //this.config.PLUGIN_NAME ,
        version: '' //this.config.PLUGIN_VERSION
      }

    try {
        // const data = await fs.promises.readFile('./files/358M9020122900148760.txt', 'utf8');
        // const data = await fs.promises.readFile('./files/358M9021010200150467.txt', 'utf8');
        // const data = await fs.promises.readFile('./files/358M9021010500151492.txt', 'utf8');
        // const data = await fs.promises.readFile('./files/358M9021010600152367.txt', 'utf8');
        const data = await fs.promises.readFile('./files/358M9021010600152367.txt', 'utf8');
        // const data = await fs.promises.readFile('./files/358M9021010700153299.txt', 'utf8');

        const dataObjects = getObjectsFromFile(data, getFileMapping());
        const notificationEventObjects = new Converter().convert(dataObjects, [getNotificationBindingMap()], { header: 0, footer: -1});
        const eventObjects = new Converter().convert(dataObjects, [getBindingMap()], { header: 0, footer: -1});

        // await mongoService.connectToDatabase(PluginInfos);

        // // Create event schema 
        // const sourcingLocationSchema = new mongoService.Schema(getSchemaSourcingLocation());
        // const physicalStocksSchema = new mongoService.Schema(getSchemaPhisicalStocks());
        // const blockedStocksSchema = new mongoService.Schema(getSchemaBlockedStocks());
        // const eventSchema = new mongoService.Schema(getSchemaEvent(sourcingLocationSchema, physicalStocksSchema, blockedStocksSchema));
// =======
// // fs.readFile('./files/358M9020122900148760.txt', 'utf8', (err, data) => {
// fs.readFile('./files/358M9021010700153299.txt', 'utf8', (err, data) => {
//     const dataObjects = getObjectsFromFile(data, getFileMapping());
//     // console.log(dataObjects);
//     console.log(object);
//     const notificationEventObjects = new Converter().convert(dataObjects, [getNotificationBindingMap()], { header: 0, footer: -1});
//     const eventObjects = new Converter().convert(dataObjects, [getBindingMap()], { header: 0, footer: -1});
// >>>>>>> Stashed changes

        // Create a model for Event manipulation
        // const EventModel = mongoService.createModel(PluginInfos, 'Event', eventSchema, 'events');
        
        // await EventModel.deleteMany();  // <--- uncomment to delete all lines
        // return;

        // let distinctValues = await EventModel.distinct('snapshotDate');
        // console.log('========== >>> Distinct snapshots in database BEFORE');
        // console.log(distinctValues);

        // const lastSnapshotDate = await EventModel.findOne().sort({'snapshotDate' : -1});
        // if (lastSnapshotDate) {
        //     if (lastSnapshotDate.snapshotDate == eventObjects[0].snapshotDate) {
        //         //check if it is a reexecution, if so, remove last imported data from database
        //         console.log(`PURGE(reexecution) - removing snapshot ${lastSnapshotDate.snapshotDate} to re-import`);
        //         await EventModel.deleteMany({snapshotDate: lastSnapshotDate.snapshotDate});
        //     } else if (lastSnapshotDate.snapshotDate < eventObjects[0].snapshotDate){
        //         // if it is not a reexecution, remove the oldiest imported data from database
        //         // Delete all documents except last importing. (it will always have the last two imports)  
        //         console.log(`PURGE - removing snapshots before ${lastSnapshotDate.snapshotDate}`);
        //         await EventModel.deleteMany({snapshotDate: {$lt : lastSnapshotDate.snapshotDate}});
        //     } else if (lastSnapshotDate.snapshotDate > eventObjects[0].snapshotDate){
        //         console.log('WARNING - Importing a snapshot older than we have in database');
        //         console.log('WARNING - Wont running PURGE routine');
        //         console.log(`removing snapshot ${eventObjects[0].snapshotDate} to re-import`);
        //         await EventModel.deleteMany({snapshotDate: eventObjects[0].snapshotDate});
        //     }
    
        // }

        // const bulkArray = [];
        // for (let index = 0; index < eventObjects.length; index++) {
        //     // Create a model event instance
        //     const event = new EventModel( eventObjects[index] );
        //     // await event.save()  <--- save one by one (bad performance)
        //     bulkArray.push( { insertOne : {"document" : event} } );
        // }
        // await EventModel.bulkWrite(bulkArray); // <-- save in bulkmode (nice performance) 


        // distinctValues = await EventModel.distinct('snapshotDate');
        // console.log('========== >>> Distinct snapshots in database AFTER');
        // console.log(distinctValues);

        
        // await mongoService.closeConnectionToDatabase(PluginInfos);
        // console.log('ok');
        const timestamp = moment().format('YYYYMMDDHHmmssSSSSS');
        const fileName = `./files/m90-output-${timestamp}.txt`;

        fs.open(fileName, 'a', (err) => {
          if (err) {
            console.log(err);
          })

    } catch (err) {
        throw err
    }
}
start();


function getSchemaSourcingLocation() {
    return {
        businessUnitIdentifier: {
            type: Number,
            required: true
        },
        identifier: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    };
}

function getSchemaEvent(sourcingLocationSchema, physicalStocksSchema, blockedStocksSchema) {
    return {
        snapshotDate: {
            type: Number,
            required: true
        },
        productReferenceAdeo: {
            type: Number,
            required: false
        },
        productReferenceBU: {
            type: Number,
            required: true
        },
        physicalStockQuantity: {
            type: Number,
            required: true
        },
        blockedStockQuantity: {
            type: Number,
            required: true
        },
        sourcingLocation: {
            type: sourcingLocationSchema,
            required: true
        },
        physicalStocks: {
            type: [physicalStocksSchema],
            required: false
        },
        blockedStocks: {
            type: [blockedStocksSchema],
            required: true
        }
    };
}

function getSchemaBlockedStocks() {
    return {
        quantity: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        reason: {
            type: String,
            required: true
        },
        date: {
            type: Number,
            required: true
        }
    };
}

function getSchemaPhisicalStocks() {
    return {
        quantity: {
            type: Number,
            required: true
        },
        expirationDate: {
            type: Number,
            required: false
        },
        qualification: {
            type: String,
            required: false
        },
        status: {
            type: String,
            required: true
        }
    };
}
