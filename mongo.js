/**
 * @module services/MongoDB
 * @description Core service to manage communication with Mongo databases.
 */

//import Logger from '../Logger'
const mongoose = require('mongoose')
const util = require('util')

const Schema = mongoose.Schema

/**
 * Open the connection to the Mongo database.
 *
 * @param {object} pluginInfos - Information about the calling plugin.
 * @param {string} pluginInfos.name - Calling plugin name.
 * @param {string} pluginInfos.version - Calling plugin version.
 * @param {string} [pluginInfos.stream] - Calling plugin stream name.
 * @param {string} [pluginInfos.feature] - Calling plugin feature.
 * @returns {Promise} Resolved promise if success, rejected with error otherwise.
 */
const connectToDatabase = (pluginInfos) => {
  //Logger.debug(`>>>> Entering in MongoDB.index.connectToDatabase(pluginInfos = ${util.inspect(pluginInfos)})`, { stream: pluginInfos?.stream, feature: pluginInfos?.feature, labels: { service: 'MongoDB', plugin: pluginInfos?.name } })
  return new Promise((resolve, reject) => {
    // if (!process.env.MONGODB_USER ||
    //   !process.env.MONGODB_PWD ||
    //   !process.env.MONGODB_HOST ||
    //   !process.env.MONGODB_PORT ||
    //   !process.env.MONGODB_NAME) {
    //   //Logger.error('Environment variables not found', { stream: pluginInfos?.stream, feature: pluginInfos?.feature, labels: { service: 'MongoDB', plugin: pluginInfos?.name } })
    //   return reject(new Error('Unable to connect to the database: Environment variables not found'))
    // }
    

    mongoose.connect('mongodb://localhost:27017/readfile', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }).then(() => {
      //Logger.info('Mongo database connection successful', { stream: pluginInfos?.stream, feature: pluginInfos?.feature, labels: { service: 'MongoDB', plugin: pluginInfos?.name } })
      return resolve()
    }).catch((err) => {
      //Logger.error(`Unable to connect to the Mongo database: ${err.message}`, { exception: err.stack, stream: pluginInfos?.stream, feature: pluginInfos?.feature, labels: { service: 'MongoDB', plugin: pluginInfos?.name } })
      return reject(new Error(`Unable to connect to the database: ${err.message}`))
    }).finally(
      //Logger.debug('<<<< Exiting MongoDB.index.connectToDatabase()', { stream: pluginInfos?.stream, feature: pluginInfos?.feature, labels: { service: 'MongoDB', plugin: pluginInfos?.name } })
    )
  })
}

/**
 * Close the database connection.
 *
 * @param {object} pluginInfos - Information about the calling plugin.
 * @param {string} pluginInfos.name - Calling plugin name.
 * @param {string} pluginInfos.version - Calling plugin version.
 * @param {string} [pluginInfos.stream] - Calling plugin stream name.
 * @param {string} [pluginInfos.feature] - Calling plugin feature.
 * @returns {Promise} Promise.
 */
const closeConnectionToDatabase = async (pluginInfos) => {
  //Logger.debug(`>>>> Entering in MongoDB.index.closeConnectionToDatabase(pluginInfos = ${util.inspect(pluginInfos)})`, { stream: pluginInfos?.stream, feature: pluginInfos?.feature, labels: { service: 'MongoDB', plugin: pluginInfos?.name } })
  //Logger.info('Closing connection to Mongo database', { stream: pluginInfos?.stream, feature: pluginInfos?.feature, labels: { service: 'MongoDB', plugin: pluginInfos?.name } })
  //Logger.debug('<<<< Exiting MongoDB.index.closeConnectionToDatabase()', { stream: pluginInfos?.stream, feature: pluginInfos?.feature, labels: { service: 'MongoDB', plugin: pluginInfos?.name } })
  return mongoose.connection.close()
}

/**
 * Create a Model (class providing an interface to perform operations on the database: create, query, update, delete records...).
 * See {@link https://mongoosejs.com/docs/api/model.html#model_Model|Mongoose API Model doc} for further information.
 *
 * @param {object} pluginInfos - Information about the calling plugin.
 * @param {string} pluginInfos.name - Calling plugin name.
 * @param {string} pluginInfos.version - Calling plugin version.
 * @param {string} [pluginInfos.stream] - Calling plugin stream name.
 * @param {string} [pluginInfos.feature] - Calling plugin feature.
 * @param {string} modelName - Name of the model.
 * @param {object} schema - Schema on which to base (a Schema defines the properties of a document through an object where the names of the keys correspond to the names of the properties in the collection).
 * See {@link https://mongoosejs.com/docs/api/schema.html#schema_Schema|Mongoose API Schema doc} for further information.
 * @param {string} collectionName - Name of the collection in database.
 * @returns {object} Model
 */
const createModel = (pluginInfos, modelName, schema, collectionName) => {
  //Logger.debug(`>>>> Entering in MongoDB.index.createModel(pluginInfos = ${util.inspect(pluginInfos)}, modelName = ${util.inspect(modelName)}, schema = ${util.inspect(schema)}, collectionName = ${util.inspect(collectionName)})`, { stream: pluginInfos?.stream, feature: pluginInfos?.feature, labels: { service: 'MongoDB', plugin: pluginInfos?.name } })
  //Logger.info('Creating a Model', { stream: pluginInfos?.stream, feature: pluginInfos?.feature, labels: { service: 'MongoDB', plugin: pluginInfos?.name } })
  schema.set('collection', collectionName)
  //Logger.debug('<<<< Exiting MongoDB.index.createModel()', { stream: pluginInfos?.stream, feature: pluginInfos?.feature, labels: { service: 'MongoDB', plugin: pluginInfos?.name } })
  return mongoose.model(modelName, schema)
}

/**
 * Delete a Model.
 *
 * @param {object} pluginInfos - Information about the calling plugin.
 * @param {string} pluginInfos.name - Calling plugin name.
 * @param {string} pluginInfos.version - Calling plugin version.
 * @param {string} [pluginInfos.stream] - Calling plugin stream name.
 * @param {string} [pluginInfos.feature] - Calling plugin feature.
 * @param {string} modelName - Name of the model to delete.
 */
const deleteModel = (pluginInfos, modelName) => {
  //Logger.debug(`>>>> Entering in MongoDB.index.deleteModel(pluginInfos = ${util.inspect(pluginInfos)}, modelName = ${util.inspect(modelName)})`, { stream: pluginInfos?.stream, feature: pluginInfos?.feature, labels: { service: 'MongoDB', plugin: pluginInfos?.name } })
  //Logger.info('Deleting a Model', { stream: pluginInfos?.stream, feature: pluginInfos?.feature, labels: { service: 'MongoDB', plugin: pluginInfos?.name } })
  mongoose.deleteModel(modelName)
  //Logger.debug('<<<< Exiting MongoDB.index.deleteModel()', { stream: pluginInfos?.stream, feature: pluginInfos?.feature, labels: { service: 'MongoDB', plugin: pluginInfos?.name } })
}

/**
 * Retrieve already defined Model names.
 *
 * @param {object} pluginInfos - Information about the calling plugin.
 * @param {string} pluginInfos.name - Calling plugin name.
 * @param {string} pluginInfos.version - Calling plugin version.
 * @param {string} [pluginInfos.stream] - Calling plugin stream name.
 * @param {string} [pluginInfos.feature] - Calling plugin feature.
 * @returns {Array} Array containing all the names of the models already defined
 */
const modelNames = (pluginInfos) => {
  //Logger.debug(`>>>> Entering in MongoDB.index.modelNames(pluginInfos = ${util.inspect(pluginInfos)})`, { stream: pluginInfos?.stream, feature: pluginInfos?.feature, labels: { service: 'MongoDB', plugin: pluginInfos?.name } })
  //Logger.info('Getting already defined Model names', { stream: pluginInfos?.stream, feature: pluginInfos?.feature, labels: { service: 'MongoDB', plugin: pluginInfos?.name } })
  //Logger.debug('<<<< Exiting MongoDB.index.modelNames()', { stream: pluginInfos?.stream, feature: pluginInfos?.feature, labels: { service: 'MongoDB', plugin: pluginInfos?.name } })
  return mongoose.modelNames()
}

module.exports = {
  connectToDatabase:connectToDatabase,
  closeConnectionToDatabase:closeConnectionToDatabase,
  Schema:Schema,
  createModel:createModel,
  deleteModel:deleteModel,
  modelNames:modelNames
};