"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnyxBlob = void 0;
const { BlobServiceClient } = require('@azure/storage-blob');
const { DefaultAzureCredential } = require('@azure/identity');
class OnyxBlob {
    blobAccountConnect(accountName) {
        if (!accountName)
            throw Error('Azure account name not found');
        const blobServiceClient = new BlobServiceClient('https://onyxfateassets.blob.core.windows.net/', new DefaultAzureCredential());
        function amain() {
            return __awaiter(this, void 0, void 0, function* () {
                const serviceGetPropertiesResponse = yield blobServiceClient.getProperties();
            });
        }
        amain()
            .then(() => console.log('Azure Blob Storage connected'))
            .catch((ex) => console.log(ex.message));
        return blobServiceClient;
    }
    createContainer(blobServiceClient, containerName) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                access: 'container'
            };
            const containerClient = yield blobServiceClient.createContainer(containerName, options);
            console.log(`container ${containerName} created`);
            return containerClient;
        });
    }
    listContainers(blobServiceClient) {
        return __awaiter(this, void 0, void 0, function* () {
            const containerNamePrefix = '';
            const maxPageSize = 4;
            const options = {
                includeDeleted: false,
                includeMetadata: true,
                includeSystem: true,
                prefix: containerNamePrefix
            };
            let i = 1;
            let marker;
            let iterator = blobServiceClient.listContainers(options).byPage({ maxPageSize });
            let response = (yield iterator.next()).value;
            if (response.containerItems) {
                for (const container of response.containerItems) {
                    console.log(`IteratorPaged: Container ${i++}: ${container.name}`);
                }
            }
            marker = response.continuationToken;
            iterator = blobServiceClient.listContainers().byPage({ continuationToken: marker, maxPageSize: maxPageSize * 2 });
            response = (yield iterator.next()).value;
        });
    }
    deleteContainer(blobServiceClient, containerName) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield blobServiceClient.deleteContainer(containerName);
            if (!response.errorCode)
                console.log(`deleted ${containerName} container`);
        });
    }
    uploadBlob(blobServiceClient, blobName, localFileWithPath, uploadOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const containerClient = blobServiceClient.getContainerClient(blobName);
            const blockBlobClient = yield containerClient.getBlockBlobClient(blobName);
            console.log(localFileWithPath);
            //await blockBlobClient.uploadFile(localFileWithPath, uploadOptions);
            //console.log(`${blobName} succeeded`);
        });
    }
    listBlobs(blobServiceClient, containerName) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const containerClient = blobServiceClient.getContainerClient(containerName);
            let i = 1;
            let blobs = containerClient.listBlobsFlat();
            try {
                for (var blobs_1 = __asyncValues(blobs), blobs_1_1; blobs_1_1 = yield blobs_1.next(), !blobs_1_1.done;) {
                    const blob = blobs_1_1.value;
                    console.log(`Blob ${i++}: ${blob.name}`);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (blobs_1_1 && !blobs_1_1.done && (_a = blobs_1.return)) yield _a.call(blobs_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
}
exports.OnyxBlob = OnyxBlob;
function joinToBlob(blobName) {
    return __awaiter(this, void 0, void 0, function* () {
        const blobServiceClient = new BlobServiceClient('https://onyxfateassets.blob.core.windows.net/', new DefaultAzureCredential());
    });
}
exports.default = joinToBlob;
//# sourceMappingURL=blob-connection.js.map