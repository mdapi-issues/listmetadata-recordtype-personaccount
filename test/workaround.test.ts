import { expect } from 'chai';
import { fixPersonAccountRecordTypes } from '../src/workaround';
import * as actual from './fixtures/actual.json';
import * as expected from './fixtures/expected.json';

const personAccountRecordTypes = [
  {
    DeveloperName: 'Freelancer',
    SobjectType: 'Account',
    IsPersonType: true
  },
  {
    DeveloperName: 'PersonAccount',
    SobjectType: 'Account',
    IsPersonType: true
  }
];

describe('person-accounts', function () {
  describe('fixPersonAccountRecordTypes', () => {
    it('fixes a PersonAccount RecordType being listed on Account', async () => {
      const result = fixPersonAccountRecordTypes(
        actual,
        personAccountRecordTypes
      );
      expect(result).to.deep.equal(expected);
    });
  });
});
