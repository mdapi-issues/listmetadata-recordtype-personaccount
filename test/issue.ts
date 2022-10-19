import type { Connection } from "@salesforce/core";
import type { FileProperties } from "jsforce/api/metadata";

export async function listRecordTypes(
  conn: Connection
): Promise<Array<FileProperties>> {
  let fileProperties = await conn.metadata.list({ type: "RecordType" });
  if (!Array.isArray(fileProperties)) {
    fileProperties = [fileProperties];
  }
  return fileProperties;
}
