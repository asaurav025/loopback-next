import { getService } from '@loopback/service-proxy';
import { inject, Provider } from '@loopback/core';
import { FileUploadDataSource } from '../datasources';

export interface FileUpload {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  uploadFile(file: any): Promise<any>;
}

export class FileUploadProvider implements Provider<FileUpload> {
  constructor(
    // file_upload must match the name property in the datasource json file
    @inject('datasources.file_upload')
    protected dataSource: FileUploadDataSource = new FileUploadDataSource(),
  ) { }

  value(): Promise<FileUpload> {
    return getService(this.dataSource);
  }
}
