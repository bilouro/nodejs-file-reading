const os = require('os');
const moment = require('moment');

function getObjectsFromFile(data, fileMapping) {
    let dataObjectsArray = [];

    const lines = data.split(os.EOL);
    checkFileIsValid(lines);

    if (lines[lines.length-1] === '') lines.pop(); // files seem to have an empty trailing line

    dataObjectsArray = lines.map((line, lineNumber) => {
        let discriminator = line.substr(fileMapping.discriminatorInitialPostion, fileMapping.discriminatorLenght);
        checkDiscriminatorIsValid(discriminator, fileMapping, lineNumber);

        let lineMapping = fileMapping.lines.get(discriminator);
        if (checkLineMappingIsValid(lineMapping, discriminator, lineNumber))
            return getObjectFromLine(lineMapping, line, lineNumber);
        
    });
    return dataObjectsArray;
}

function getObjectFromLine(lineMapping, line, lineNumber) {
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

    const dateMoment = moment(value, attribute.dateFormat);
    if (!dateMoment.isValid())
        throw `Value "${value}", is not a valid Date for the attribute ${attribute.name} (${attribute.dateFormat}). line number ${lineNumber}.`;
    return dateMoment.toDate();
}

function parseString(value, attribute, lineNumber) {
  const convertedValue = value.trim();
  // const convertedValue = value;
  // if (convertedValue == '') return null;

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

function checkFileIsValid(lines) {
    if (!lines || (lines.length == 1 && lines[0] == ''))
        throw `file has no lines`;
}

function checkLineMappingIsValid(lineMapping, discriminator, lineNumber) {
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
    if (attribute.required && (value === null) )
        throw `${attribute.name} is required but has no value. line number ${lineNumber}.`;
}

function checkMappingIsValid(attribute) {
    if (!attribute)
        throw 'missing mapping attribute';
    if (!attribute.name)
        throw 'missing mapping attribute: name';
    if (!attribute.initialPosition && attribute.initialPosition != 0) //ZERO is valid
        throw 'missing mapping attribute: initialPosition';
    if (!attribute.length)
        throw 'missing mapping attribute: length';
}

exports.getObjectsFromFile = getObjectsFromFile;
