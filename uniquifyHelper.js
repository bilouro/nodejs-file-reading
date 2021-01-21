
function uniquifyList(list, attributesToMerge, getUniqueValueFunction) {
  let uniqueMap = new Map();

  list.forEach(obj => {

    const preExistentDistinctObj = uniqueMap.get(getUniqueValueFunction(obj));
    if (!preExistentDistinctObj) {

      uniqueMap.set(getUniqueValueFunction(obj), obj);
    } else {

      attributesToMerge.forEach(att => {

        if (Array.isArray(preExistentDistinctObj[att])) {

          preExistentDistinctObj[att].push(...obj[att]);
        } else {
          
          if (!preExistentDistinctObj[att]) {
            preExistentDistinctObj[att] = obj[att];
          }

        }
      });
    }
  });
  return Array.from(uniqueMap.values());
}
exports.uniquifyList = uniquifyList;
