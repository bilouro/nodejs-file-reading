const { isDate } = require("moment");

class Converter {

    getProperBindMap(bindMapArray, object) {
        if (bindMapArray.length == 1){
            const bindMap = bindMapArray[0];

        } else { // (bindMapArray.length > 1) {
            for (let i = 0; i < bindMapArray.length; i++) {
                const bindMap = bindMapArray[i];
                let processObjectOnlyIfMap = bindMap.processObjectOnlyIf;
    
                if (!processObjectOnlyIfMap) throw `Atribute processObjectOnlyIf is required when more than one bind is given`;

                let isProper = true;
                for (let [attribute, valuesList] of processObjectOnlyIfMap) {
                    if (!object[attribute]) throw `Attribute "${attribute}" defined in mapping.processObjectOnlyIf does not exist in source object`;
                    if (!valuesList.includes(object[attribute])) {
                        isProper = false;
                        break;
                    }
                }
                if (isProper) {
                    return bindMap;
                }
            }
            
            throw `There is no proper bindmap to object "${JSON.stringify(object, null, 2)}" defined in processObjectOnlyIf in bindMapArray`;
        } 
    }

    convert(dataObjects, bindingMapArray, opts) {
        let returnObjects = [];
        let header = (opts && opts.header != undefined && opts.header != null) ? dataObjects[opts.header] : null;
        let footer = (opts && opts.footer != undefined && opts.footer != null) ? dataObjects[dataObjects.length + opts.footer] : null;

        //start 1(one) object after the header object
        let i = (opts && opts.header != undefined && opts.header != null) ? opts.header + 1 : 0;
        //dont process footer object (stop one object before)  //footer has negative value
        let dataObjectsLenght = (opts && opts.footer != undefined && opts.footer != null) ? dataObjects.length + opts.footer : dataObjects.length;

        if (Array.isArray(bindingMapArray)) {
            if (bindingMapArray.length == 0) throw `BindingMapArray is required`;
        } else {
            throw `BindingMapArray is required or invalid. it must be an array`;
        }

        for (; i < dataObjectsLenght; i++) {
            let sourceObject = dataObjects[i];
            let destinationObject = {};

            let bindingMap = this.getProperBindMap(bindingMapArray,sourceObject);

            let skipObjectIfMap = (bindingMap.skipObjectIf) ? bindingMap.skipObjectIf : null;
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
