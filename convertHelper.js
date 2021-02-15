const { isDate } = require("moment");
const { setNestedAttribute } = require("./nestedUtil");


class Converter {

    getProperBindMap(bindMapArray, object) {
        if (bindMapArray.length == 1){
            return bindMapArray[0];

        } else { // (bindMapArray.length > 1) {
            for (let i = 0; i < bindMapArray.length; i++) {
                const bindMap = bindMapArray[parseInt(i)];
                let processObjectOnlyIfMap = bindMap.processObjectOnlyIf;
    
                if (!processObjectOnlyIfMap) throw `Attribute processObjectOnlyIf is required when more than one bind is given`;

                let isProper = true;
                for (let [attribute, valuesList] of processObjectOnlyIfMap) {
                    if (!object[String(attribute)]) throw `Attribute "${attribute}" defined in mapping.processObjectOnlyIf does not exist in source object`;
                    if (!valuesList.includes(object[String(attribute)])) {
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
        let dataObjectsLength = (opts && opts.footer != undefined && opts.footer != null) ? dataObjects.length + opts.footer : dataObjects.length;

        if (Array.isArray(bindingMapArray)) {
            if (bindingMapArray.length == 0) throw `BindingMapArray is required`;
        } else {
            throw `BindingMapArray is required or invalid. it must be an array`;
        }

        for (; i < dataObjectsLength; i++) {
            let sourceObject = dataObjects[parseInt(i)];
            let destinationObject = {};

            let bindingMap = this.getProperBindMap(bindingMapArray,sourceObject);

            let skipObjectIfMap = (bindingMap.skipObjectIf) ? bindingMap.skipObjectIf : null;
            if (skipObjectIfMap && this.skipCurrentLine(skipObjectIfMap, sourceObject)) continue;

            for (let j = 0; j < bindingMap.bindings.length; j++) {
                let bind = bindingMap.bindings[parseInt(j)];

                switch (bind.type) {
                    case 'copy':
                        setNestedAttribute(destinationObject, bind.destination, sourceObject[bind.source]);
                        break;
                    case 'header':
                        setNestedAttribute(destinationObject, bind.destination, header[bind.source]);
                        break;
                    case 'footer':
                        setNestedAttribute(destinationObject, bind.destination, footer[bind.source]);
                        break;
                    case 'fixed':
                        setNestedAttribute(destinationObject, bind.destination, bind.value);
                        break;
                    case 'function':
                        setNestedAttribute(destinationObject, 
                            bind.destination, 
                            bind.value(sourceObject, header, footer, dataObjects.slice(i+1, dataObjectsLength))
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
            if (!object[String(attribute)]) throw new Error(`Attribute "${attribute}" defined in mapping.skipObjectIf does not exist in source object`);
            if (skipValuesList.includes(object[String(attribute)])) return true;
        }
        return false;
    }

}
exports.Converter = Converter;
