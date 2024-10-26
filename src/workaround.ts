import type { FileProperties } from "@jsforce/jsforce-node/lib/api/metadata.js";
import type { Connection } from "@salesforce/core";

export interface RecordType {
  DeveloperName: string;
  SobjectType: string;
  IsPersonType: boolean;
}

export async function queryPersonAccountRecordTypes(
  conn: Connection
): Promise<Array<RecordType>> {
  let personAccountRecordTypes = [];
  try {
    const personAccountRecordTypesResult = await conn.query<RecordType>(
      `SELECT DeveloperName, SobjectType, IsPersonType FROM RecordType WHERE SobjectType='Account' AND IsPersonType=true`
    );
    personAccountRecordTypes = Array.isArray(
      personAccountRecordTypesResult.records
    )
      ? personAccountRecordTypesResult.records
      : [personAccountRecordTypesResult.records];
  } catch (e) {
    // ignore errors here since the query only succeeds when PersonAccounts are enabled
  }
  return personAccountRecordTypes;
}

export function fixPersonAccountRecordTypes(
  fileProperties: Array<FileProperties>,
  personAccountRecordTypes: Array<RecordType>
): Array<FileProperties> {
  return fileProperties.map((fileProperty) => {
    if (fileProperty.type === "RecordType" && personAccountRecordTypes) {
      const fullNameParts = fileProperty.fullName.split(".");
      const itemType = fullNameParts[0];
      const fullName = fullNameParts[1];
      const personAccountRecordTypeMatch = personAccountRecordTypes.find(
        (rt) =>
          rt.DeveloperName === fullName &&
          rt.SobjectType === itemType &&
          rt.IsPersonType === true
      );
      if (personAccountRecordTypeMatch) {
        fileProperty.fullName = `PersonAccount.${fullName}`;
        fileProperty.fileName = "objects/PersonAccount.object";
      }
    }
    return fileProperty;
  });
}
