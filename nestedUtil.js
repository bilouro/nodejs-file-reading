
function genericSetNestedAttribute(object, path, value, _function) {
    let tempObject;
    if (!path) throw new Error('Argument path not informed');
    if (!object) throw new Error('Argument object not informed');

    let splittedPath = path.split('.');
    if (splittedPath.length == 1) {
        _function(object, path, value);
    } else { // > 1
        tempObject = object;
        for (let index = 0; index < splittedPath.length - 1; index++) {
            const nestedObject = splittedPath[index];
            if (!tempObject[nestedObject]) tempObject[nestedObject] = {};
            tempObject = tempObject[nestedObject];
        }
        let attribute = splittedPath[splittedPath.length - 1];
        _function(tempObject, attribute, value);  
    }
}
function pushNestedAttribute(object, path, value) {
    genericSetNestedAttribute(object, path, value, pushValue);
}

function setNestedAttribute(object, path, value) {
    genericSetNestedAttribute(object, path, value, setValue);
}

function setValue(object, attribute, value) {
    object[attribute] = value;
}

function pushValue(object, attribute, value) {
    if (!object[attribute]) object[attribute] = [];
    object[attribute].push(value);
}

module.exports = {
    setNestedAttribute: setNestedAttribute,
    pushNestedAttribute: pushNestedAttribute,
    pushValue,
    setValue,
    genericSetNestedAttribute
};
