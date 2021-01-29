const os = require('os');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const { setNestedAttribute, pushNestedAttribute } = require("./nestedUtil");


function getObjectsFromFile(data, fileMapping) {
    let dataObjectsArray = [];
    let parentMap = new Map();

    const lines = data.split(os.EOL);
    checkFileIsValid(lines);
    
    for(let lineNumber=0;lineNumber<lines.length;lineNumber++){
        let line = lines[lineNumber];
        if (!isLineHasData(line)) continue; //ignoring empty lines
        
        let discriminator = line.substr(fileMapping.discriminatorInitialPosition, fileMapping.discriminatorInitialPostion+fileMapping.discriminatorLenght);
        checkDiscriminatorIsValid(discriminator, fileMapping, lineNumber);

        let lineMapping = fileMapping.lines.get(discriminator);
        if (!isLineMappingValid(lineMapping, discriminator, lineNumber)) continue;
        
        let object = getObjectFromLine(lineMapping, line, lineNumber, parentMap);
        object.uuid = uuidv4();

        parentMap.set(discriminator, object);

        dataObjectsArray.push(object);
    }
    return dataObjectsArray;
}


function getObjectFromLine(lineMapping, line, lineNumber, parentMap) {
    const dataObject = {};
    for (i=0;i<lineMapping.length;i++){

        const attribute = lineMapping[i];
        checkMappingIsValid(attribute);

        const value = line.substring(attribute.initialPosition, attribute.initialPosition + attribute.length);
        switch (attribute.type) {
            case 'integer':
                dataObject[attribute.name] = parseInteger(value, attribute, lineNumber);
                break;
            case 'date':
                dataObject[attribute.name] = parseDate(value, attribute, lineNumber);
                break;
            case 'string':
                dataObject[attribute.name] = parseString(value, attribute, lineNumber);
                break;
            case 'parent':
                if (attribute.name == 'parent') throw "Attribute Parent, declared in lineMapping. Could not be named 'parent', due to, its reserved to de parent object";
                dataObject[attribute.name] = parentMap.get(attribute.parentDiscriminator)[attribute.parentAttribute];
                
                //adding children to parent
                pushNestedAttribute(parentMap.get(attribute.parentDiscriminator), attribute.childName, dataObject);
                
                //adding parent attribute to the children.
                dataObject['parent'] = parentMap.get(attribute.parentDiscriminator);
                break;
            default:
                throw `Attribute type "${attribute.type}", declared in lineMapping is not valid or not implemented. line number ${lineNumber}.`;
        }
        checkRequiredIsValid(attribute, dataObject[attribute.name], lineNumber);
    }
    return dataObject;
}

function parseDate(value, attribute, lineNumber) {
    if (!attribute.dateFormat)
        throw `The attribute ${attribute.name} has no dateFormat declared in lineMapping`;

    if (attribute.nullIf && attribute.nullIf.includes(value))
      return null;

    const dateMoment = moment(value, attribute.dateFormat);
    if (!dateMoment.isValid())
        throw `Value "${value}", is not a valid Date for the attribute ${attribute.name} (${attribute.dateFormat}). line number ${lineNumber}.`;
    return dateMoment.toDate();
}

function parseString(value, attribute, lineNumber) {
  const convertedValue = value.trim();
  if (convertedValue == '') return null;

  return convertedValue;
}

function parseInteger(value, attribute, lineNumber) {
    if (value && isNaN(value))
        throw `Value "${value}", is not a valid Number for the attribute ${attribute.name}. line number ${lineNumber}.`;

    const convertedValue = parseInt(value);
    if (isNaN(convertedValue))
        return null;
    
    return convertedValue;
}

function isLineHasData(line) {
    if (!line) return false;
    return line.trim() != '';
}

function checkFileIsValid(lines) {
    if (!lines || (lines.length == 1 && lines[0] == ''))
        throw `file has no lines`;
}

function isLineMappingValid(lineMapping, discriminator, lineNumber) {
    if (!lineMapping || lineMapping.length == 0) {
        console.log(`missing lineMapping for discriminator "${discriminator}". Line #${lineNumber} IGNORED`);
        return false;
    }
    return true;
}

function checkDiscriminatorIsValid(discriminator, fileMapping, lineNumber) {
    if (!discriminator)
        throw `could not get discriminator at position ${fileMapping.discriminatorInitialPostion}(${fileMapping.discriminatorLenght}). line number ${lineNumber}.`;
}

function checkRequiredIsValid(attribute, value, lineNumber) {
    if (attribute.required && (!value && value != 0) )
        throw `${attribute.name} is required but has no value. line number ${lineNumber}.`;
}

function checkMappingIsValid(attribute) {
    if (!attribute)
        throw 'missing mapping attribute';
    if (!attribute.name)
        throw 'missing mapping attribute: name';
    if (!attribute.initialPosition && attribute.initialPosition != 0 && attribute.type != 'parent') //ZERO is valid
        throw 'missing mapping attribute: initialPosition';
    if (!attribute.length && attribute.type != 'parent')
        throw 'missing mapping attribute: length';
}

module.exports = {
    getObjectsFromFile: getObjectsFromFile,
    isLineHasData: isLineHasData,
    parseString: parseString,
    parseInteger: parseInteger,
    parseDate: parseDate,
};