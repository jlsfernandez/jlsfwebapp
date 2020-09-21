const CosmosClient = require('@azure/cosmos').CosmosClient;
const coursesData = require('./courses.json');

/* the endpoint and the key*/
const client = new CosmosClient({
    endpoint: 'https://jlsfwebappcosmosdb.documents.azure.com:443/',
    key: 'QV85vX3L6YnX55jVeyZK7mkpjHGqaIlc07XtCMniuDXGtfC4HwuaeT2fpLldqJ22xCAhtqzr2r1VjHoQVHppZA=='
  });

const databaseId = 'webappcosmosdb';
const containerId = 'webappcontainer';

let container;

const getContainer = async () => {
  if(!container) {
    container = await client.database(databaseId).container(containerId);
  }
  return container;
}

module.exports.queryCourses = async () => {
    const c = await getContainer();
    const { resources } = await c.items.readAll().fetchAll();
    return resources;
  };
  
  module.exports.createCourses = async () => {
    const c = await getContainer();
    await Promise.all(coursesData.map(course => c.items.create(course)));
    return { itemCount: coursesData.length };
  }; 