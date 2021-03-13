import type { FileProperties, Connection } from 'jsforce';

export async function listRecordTypes(
  conn: Connection
): Promise<Array<FileProperties>> {
  let fileProperties = await conn.metadata.list({ type: 'RecordType' });
  if (!Array.isArray(fileProperties)) {
    fileProperties = [fileProperties];
  }
  return fileProperties;
}
