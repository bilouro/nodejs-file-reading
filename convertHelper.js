class Converter {

    convert(dataObjects, bindingMap) {
        let returnObjects = [];
        let header = (bindingMap.header != null) ? dataObjects[bindingMap.header] : null;
        let footer = (bindingMap.footer != null) ? dataObjects[dataObjects.length + bindingMap.footer] : null;
        let skipObjectIfMap = (bindingMap.skipObjectIf) ? bindingMap.skipObjectIf : null;

        //start 1(one) object after the header object
        let i = (bindingMap.header != null) ? bindingMap.header + 1 : 0;
        //dont process footer object (stop one object before)  //footer has negative value
        let dataObjectsLenght = (bindingMap.footer != null) ? dataObjects.length + bindingMap.footer : dataObjects.length;
        for (; i < dataObjectsLenght; i++) {
            let sourceObject = dataObjects[i];
            let destinationObject = {};

            if (skipObjectIfMap && this.skipCurrentLine(skipObjectIfMap, sourceObject)) continue;

            for (let j = 0; j < bindingMap.bindings.length; j++) {
                let bind = bindingMap.bindings[j];

                switch (bind.type) {
                    case 'copy':
                        this.setNestedAttribute(destinationObject, bind.destination, sourceObject[bind.source]);
                        break;
                    case 'header':
                        this.setNestedAttribute(destinationObject, bind.destination, header[bind.source]);
                        break;
                    case 'footer':
                        this.setNestedAttribute(destinationObject, bind.destination, footer[bind.source]);
                        break;
                    case 'fixed':
                        this.setNestedAttribute(destinationObject, bind.destination, bind.value);
                        break;
                    case 'function':
                        this.setNestedAttribute(destinationObject, 
                            bind.destination, 
                            bind.value(sourceObject, header, footer, dataObjects.slice(i+1, dataObjectsLenght))
                            );
                        break;
                    default:
                        throw `Bind type "${bind.type}", declared in bindingMap is not valid or not implemented. Bind destination ${bind.destination}.`;
                }
            }
            returnObjects.push(destinationObject);
        }
        return returnObjects;
    }

    skipCurrentLine(skipObjectIfMap, object) {
        for (let [attribute, skipValuesList] of skipObjectIfMap) {
            if (!object[attribute]) throw `Attribute "${attribute}" defined in mapping.skipObjectIf does not exist in source object`;
            if (skipValuesList.includes(object[attribute])) return true;
        }
        return false;
    }

    setNestedAttribute(object, path, value) {
        let tempObject;
        if (!path) throw 'Argument path not informed';
        if (!object) throw 'Argument object not informed';

        let splitedPath = path.split('.');
        if (splitedPath.length == 1) {
            object[path] = value;
        } else { // > 1
            tempObject = object;
            for (let index = 0; index < splitedPath.length - 1; index++) {
                const nestedObject = splitedPath[index];
                if (!tempObject[nestedObject]) tempObject[nestedObject] = {};
                tempObject = tempObject[nestedObject];
            }
            let attribute = splitedPath[splitedPath.length - 1];
            tempObject[attribute] = value;
        }
    }
}
exports.Converter = Converter;
