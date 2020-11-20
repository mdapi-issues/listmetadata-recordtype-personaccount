import { Org } from '@salesforce/core';
import { FileProperties } from 'jsforce';

export default async function listRecordTypes(): Promise<
  Array<FileProperties>
> {
  const org = await Org.create({});
  const conn = org.getConnection();
  let fileProperties = await conn.metadata.list({ type: 'RecordType' });
  if (!Array.isArray(fileProperties)) {
    fileProperties = [fileProperties];
  }
  return fileProperties;
}
