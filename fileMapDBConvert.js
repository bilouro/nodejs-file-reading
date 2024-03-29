const { getFileMapping: getM80FileMapping } = require("./mappers/m80FileMapping");
const { getFileMapping: getM51FileMapping } = require("./mappers/m51FileMapping");
const { getFileMapping: getM90FileMapping } = require("./mappers/m90FileMapping");
const { getFileMapping: getM41FileMapping } = require("./mappers/m41FileMapping");

// Supply native file maps as and array
// booleans to trigger the conversion fo different parts of the file mapping
function dbConversion(fileMappings = [], header = false, footer = false, lines = true) {
  const dbAttributes = {};
  fileMappings.forEach((fileMapping) => {
    if (!fileMapping) return;

    fileMapping.lines.forEach((mappings, discriminator) => {
      if (
        ((discriminator === '00' || discriminator === '00.00') && header ) || 
        ((discriminator === '99' || discriminator === '99.00') && footer) || 
        ((discriminator !== '00' && discriminator !== '00.00') && (discriminator !== '99' && discriminator !== '99.00') && lines)) {
      
        mappings.forEach(field => {
          if (!dbAttributes[field.name]) {
            let dataType = null;
            switch (field.type) {
              case 'integer':
                dataType = 'DataTypes.INTEGER';
                break;
              case 'date':
                // 2020-01-01T00:00:00.000Z
                dataType = 'DataTypes.DATE';
                break;
              case 'parent':
                // uuid of parent
                dataType = 'DataTypes.STRING(36)';
                break;
              default: 
                dataType = `DataTypes.STRING(${field.length})`;
            }
            dbAttributes[field.name] = { field: field.name, type: dataType, allowNull: true };
          } else {
            const previousLength = dbAttributes[field.name].type.split('(')[0] === 'DataTypes.STRING' ? Number(dbAttributes[field.name].type.split('(')[1].split(')')[0]): 0;
            if (field.type === 'integer' || field.type === 'date' || field.type === 'parent') return;
            else if (field.length === previousLength || field.length <= previousLength) return;
            dbAttributes[field.name].type = `DataTypes.STRING(${field.length})`;
          }
        })
      }
      
    });
  })
  dbAttributes.uuid = { field: 'uuid', type: 'DataTypes.STRING(36)', allowNull: true };

  return dbAttributes
};

console.log(dbConversion([getM80FileMapping(), getM90FileMapping(), getM41FileMapping()], false, true, false));
