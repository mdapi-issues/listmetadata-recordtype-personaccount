import { expect } from 'chai';
import listRecordTypes from '../src/issue';

describe('listMetadata', function () {
  this.slow(5000);
  this.timeout(20000);
  it('incorrectly lists RecordTypes of PersonAccount on Account', async () => {
    const fileProperties = await listRecordTypes();
    const personAccountRecordType = fileProperties.find((rt) =>
      /.*\.PersonAccount/.test(rt.fullName)
    );
    expect(personAccountRecordType.fullName).to.deep.equal(
      'Account.PersonAccount'
    );
  });
});
