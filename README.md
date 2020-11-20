# listmetadata-recordtype-personaccount

> Minimal working example to demonstrate a bug in listMetadata that RecordTypes of PersonAccount are wrongly listed as RecordTypes of Account

References:

- https://github.com/forcedotcom/cli/issues/734

A RecordType on Account correctly listed on Account

```json
{
  "createdById": "0053D0000050OT3QAM",
  "createdByName": "User User",
  "createdDate": "2020-11-18T13:31:00.000Z",
  "fileName": "objects/Account.object",
  "fullName": "Account.Business_Account",
  "id": "0123D000001leAQQAY",
  "lastModifiedById": "0053D0000050OT3QAM",
  "lastModifiedByName": "User User",
  "lastModifiedDate": "2020-11-18T13:31:00.000Z",
  "manageableState": "unmanaged",
  "type": "RecordType"
}
```

RecordTypes of PersonAccount are wrongly listed on Account

```json
[
  {
    "createdById": "0053D0000050OT3QAM",
    "createdByName": "User User",
    "createdDate": "2020-11-18T13:31:01.000Z",
    "fileName": "objects/Account.object",
    "fullName": "Account.PersonAccount",
    "id": "0123D000001leARQAY",
    "lastModifiedById": "0053D0000050OT3QAM",
    "lastModifiedByName": "User User",
    "lastModifiedDate": "2020-11-18T13:31:01.000Z",
    "manageableState": "unmanaged",
    "type": "RecordType"
  },
  {
    "createdById": "0053D0000050OT3QAM",
    "createdByName": "User User",
    "createdDate": "2020-11-19T08:27:12.000Z",
    "fileName": "objects/Account.object",
    "fullName": "Account.Freelancer",
    "id": "0123D000001ljZmQAI",
    "lastModifiedById": "0053D0000050OT3QAM",
    "lastModifiedByName": "User User",
    "lastModifiedDate": "2020-11-19T08:27:12.000Z",
    "manageableState": "unmanaged",
    "type": "RecordType"
  }
]
```

## Workaround

```typescript
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
result = fixPersonAccountRecordTypes(result, personAccountRecordTypes);
```
