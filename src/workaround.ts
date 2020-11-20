import { FileProperties } from 'jsforce';

export function fixPersonAccountRecordTypes(
  fileProperties: Array<FileProperties>,
  personAccountRecordTypes: Array<RecordType>
): Array<FileProperties> {
  return fileProperties.map((fileProperty) => {
    if (fileProperty.type === 'RecordType' && personAccountRecordTypes) {
      const fullNameParts = fileProperty.fullName.split('.');
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
        fileProperty.fileName = 'objects/PersonAccount.object';
      }
    }
    return fileProperty;
  });
}

interface RecordType {
  DeveloperName: string;
  SobjectType: string;
  IsPersonType: boolean;
}
