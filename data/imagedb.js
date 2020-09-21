const { 
  BlobServiceClient, 
  BlobSASPermissions, 
  generateBlobSASQueryParameters 
} = require('@azure/storage-blob');

const moment = require('moment');
const { v1: uuidv1 } = require('uuid');

const CONNECTION_STRING = 'DefaultEndpointsProtocol=https;AccountName=jlsfwebapp;AccountKey=sPa+0KwJG8N/imWsXZXkLZPRdSxrxd4VqAVZYCGlnNKtohvjYHpMS8RqeuyduGqizZVbXtJfSsIkPYctYzjJFQ==;EndpointSuffix=core.windows.net';

const containerName = 'userimages';

let _containerClient;
const getContainerClient = async () => {
  if(!_containerClient) {
    const blobServiceClient = await BlobServiceClient.fromConnectionString(CONNECTION_STRING);
    _containerClient = await blobServiceClient.getContainerClient(containerName);
  }
  return _containerClient;
};

const getSASQueryString = (fileId, credential) => {
  const params = {
    containerName: containerName,
    blobName: fileId,
    permissions: BlobSASPermissions.parse('r'),
    startsOn: new Date(),
    expiresOn: moment().add(30, 'minutes')
  };
  return generateBlobSASQueryParameters(params, credential).toString();
};

module.exports.uploadImage = async (stream) => {
  const containerClient = await getContainerClient();
  const fileId = uuidv1();
  const blockBlobClient = containerClient.getBlockBlobClient(fileId);
  await blockBlobClient.uploadStream(stream);
  return {
    id: fileId
  };
};

module.exports.getImageUri = async (id) => {
  const containerClient = await getContainerClient();
  const blockBlobClient = containerClient.getBlockBlobClient(id);
  return `${blockBlobClient.url}?${getSASQueryString(id, containerClient.credential)}`;
};
