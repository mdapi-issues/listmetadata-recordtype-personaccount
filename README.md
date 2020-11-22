# listmetadata-recordtype-personaccount

> Minimal working example to demonstrate a bug in listMetadata that RecordTypes of PersonAccount are wrongly listed as RecordTypes of Account

[![Actions Status](https://github.com/mdapi-issues/listmetadata-recordtype-personaccount/workflows/Test%20and%20Release/badge.svg)](https://github.com/mdapi-issues/listmetadata-recordtype-personaccount/actions)

## Steps to reproduce the issue

Create a scratch org with PersonAccounts feature enabled

```console
sfdx force:org:create -f config/project-scratch-def.json -s
```

push some Metadata (here: `RecordType:PersonAccount.Freelancer`)

```console
sfdx force:source:push
```

list RecordTypes using `listMetadata`

```console
sfdx force:mdapi:listmetadata -m RecordType
```

```diff
- actual
+ expected
```

```diff
[
  ...
  {
    "createdById": "0053D0000050OT3QAM",
    "createdByName": "User User",
    "createdDate": "2020-11-18T13:31:01.000Z",
-    "fileName": "objects/Account.object",
+    "fileName": "objects/PersonAccount.object",
-    "fullName": "Account.PersonAccount",
+    "fullName": "PersonAccount.PersonAccount",
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
-    "fileName": "objects/Account.object",
+    "fileName": "objects/PersonAccount.object",
-    "fullName": "Account.Freelancer",
+    "fullName": "PersonAccount.Freelancer",
    "id": "0123D000001ljZmQAI",
    "lastModifiedById": "0053D0000050OT3QAM",
    "lastModifiedByName": "User User",
    "lastModifiedDate": "2020-11-19T08:27:12.000Z",
    "manageableState": "unmanaged",
    "type": "RecordType"
  }
]
```

## References

- [forcedotcom/cli#734: PersonAccount issues with listMetadata and deployment](https://github.com/forcedotcom/cli/issues/734)
