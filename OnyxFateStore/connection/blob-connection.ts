const { BlobServiceClient } = require('@azure/storage-blob');
const { DefaultAzureCredential } = require('@azure/identity');

export class OnyxBlob{
    blobAccountConnect(accountName) {

        if (!accountName) throw Error('Azure account name not found');

        const blobServiceClient = new BlobServiceClient(
            'https://onyxfateassets.blob.core.windows.net/',
            new DefaultAzureCredential()
        );

        async function amain() {
            const serviceGetPropertiesResponse = await blobServiceClient.getProperties();
        }

        amain()
            .then(() => console.log('Azure Blob Storage connected'))
            .catch((ex) => console.log(ex.message));

        return blobServiceClient;
    }

    async createContainer(blobServiceClient, containerName) {

        const options = {
            access: 'container'
        };

        const containerClient = await blobServiceClient.createContainer(containerName, options);
        console.log(`container ${containerName} created`);

        return containerClient;
    }

    async listContainers(blobServiceClient) {
        const containerNamePrefix = '';

        const maxPageSize = 4;

        const options = {
            includeDeleted: false,
            includeMetadata: true,
            includeSystem: true,
            prefix: containerNamePrefix
        }

        let i = 1;
        let marker;
        let iterator = blobServiceClient.listContainers(options).byPage({ maxPageSize });
        let response = (await iterator.next()).value;

        if (response.containerItems) {
            for (const container of response.containerItems) {
                console.log(`IteratorPaged: Container ${i++}: ${container.name}`);
            }
        }

        marker = response.continuationToken;

        iterator = blobServiceClient.listContainers().byPage({ continuationToken: marker, maxPageSize: maxPageSize * 2 });
        response = (await iterator.next()).value;

    }

    async deleteContainer(blobServiceClient, containerName) {
        const response = await blobServiceClient.deleteContainer(containerName);

        if (!response.errorCode)
            console.log(`deleted ${containerName} container`);
    }

    async uploadBlob(blobServiceClient, blobName, localFileWithPath, uploadOptions) {

        const containerClient = blobServiceClient.getContainerClient(blobName);

        const blockBlobClient = await containerClient.getBlockBlobClient(blobName);

        console.log(localFileWithPath);

        //await blockBlobClient.uploadFile(localFileWithPath, uploadOptions);
        //console.log(`${blobName} succeeded`);
    }

    async listBlobs(blobServiceClient, containerName) {
        const containerClient = blobServiceClient.getContainerClient(containerName);

        let i = 1;
        let blobs = containerClient.listBlobsFlat();
        for await (const blob of blobs) {
            console.log(`Blob ${i++}: ${blob.name}`);
        }
    } 
}

async function joinToBlob(blobName) {
    const blobServiceClient = new BlobServiceClient(
        'https://onyxfateassets.blob.core.windows.net/',
        new DefaultAzureCredential()
    );
}

export default joinToBlob;