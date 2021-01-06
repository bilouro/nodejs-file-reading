function convert(dataObjects, bindingMap) {
    let returnObjects = [];
    let header = (bindingMap.header != null) ? dataObjects[bindingMap.header] : null;
    let footer = (bindingMap.footer != null) ? dataObjects[dataObjects.length + bindingMap.footer] : null;

    //start 1(one) object after the header object
    let i = (bindingMap.header != null) ? bindingMap.header + 1 : 0;
    //dont process footer object (stop one object before)  //footer has negative value
    let dataObjectsLenght = (bindingMap.footer != null) ? dataObjects.length + bindingMap.footer : dataObjects.length;
    for (; i < dataObjectsLenght; i++) {
        let sourceObject = dataObjects[i];
        let destinationObject = {};

        for (j = 0; j < bindingMap.bindings.length; j++) {
            let bind = bindingMap.bindings[j];

            switch (bind.type) {
                case 'copy':
                    destinationObject[bind.destination] = sourceObject[bind.source];
                    break;
                case 'fixed':
                    destinationObject[bind.destination] = bind.value;
                    break;
                case 'function':
                    destinationObject[bind.destination] = bind.value(sourceObject, header, footer, dataObjects.slice(i+1, dataObjectsLenght));
                    break;
                default:
                    throw `Bind type "${bind.type}", declared in bindingMap is not valid or not implemented. Bind destination ${bind.destination}.`;
            }
        }
        returnObjects.push(destinationObject);
    }
    return returnObjects;
}
exports.convert = convert;
