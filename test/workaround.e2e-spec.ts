import { Org } from '@salesforce/core';
import { expect } from 'chai';
import {
  fixPersonAccountRecordTypes,
  queryPersonAccountRecordTypes
} from '../src/workaround';
import { listRecordTypes } from './issue';

describe('workaround', function () {
  this.slow(5000);
  this.timeout(20000);
  it('fixes a PersonAccount RecordType being listed on Account', async () => {
    const org = await Org.create({});
    const conn = org.getConnection();
    const fileProperties = await listRecordTypes(conn);
    const personAccountRecordTypes = await queryPersonAccountRecordTypes(conn);
    const fixedFileProperties = fixPersonAccountRecordTypes(
      fileProperties,
      personAccountRecordTypes
    );
    const personAccountRecordType = fixedFileProperties.find((rt) =>
      /.*\.PersonAccount/.test(rt.fullName)
    );
    expect(personAccountRecordType.fullName).to.deep.equal(
      'PersonAccount.PersonAccount'
    );
  });
});
