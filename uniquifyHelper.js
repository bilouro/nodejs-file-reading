
function uniquifyList(list, attributesToMerge, getUniqueValueFunction) {
  let uniqueMap = new Map();

  list.forEach(obj => {

    const preExistentDistinctObj = uniqueMap.get(getUniqueValueFunction(obj));
    if (!preExistentDistinctObj) {

      uniqueMap.set(getUniqueValueFunction(obj), obj);
    } else {

      attributesToMerge.forEach(att => {

        if (Array.isArray(obj[att])) {

          // setting new parent
          obj[att].map( childObj => { childObj.parent = preExistentDistinctObj; });
          
          // check if destination has an array ok
          if (preExistentDistinctObj[att] == null ) preExistentDistinctObj[att] = [];
          preExistentDistinctObj[att].push(...obj[att]);
        } else {
          
          const isObject = function(a) {
            return (!!a) && (a.constructor === Object);
          };

          // avoid overwrite preexisting values
          if (!preExistentDistinctObj[att]) {
            
            //setting new parent if it is an object and already have parent attribute
            if (isObject(obj[att] && obj[att].parent != undefined)) obj[att].parent = preExistentDistinctObj;            
            
            preExistentDistinctObj[att] = obj[att];
          }

        }
      });
    }
  });
  return Array.from(uniqueMap.values());
}
exports.uniquifyList = uniquifyList;
