
function genericSetNestedAttribute(object, path, value, _function) {
    let tempObject;
    if (!path) throw 'Argument path not informed';
    if (!object) throw 'Argument object not informed';

    let splitedPath = path.split('.');
    if (splitedPath.length == 1) {
        _function(object, path, value);
    } else { // > 1
        tempObject = object;
        for (let index = 0; index < splitedPath.length - 1; index++) {
            const nestedObject = splitedPath[index];
            if (!tempObject[nestedObject]) tempObject[nestedObject] = {};
            tempObject = tempObject[nestedObject];
        }
        let attribute = splitedPath[splitedPath.length - 1];
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
};
