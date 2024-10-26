import { Org } from "@salesforce/core";
import { expect } from "chai";
import { listRecordTypes } from "./issue.js";

describe("listMetadata", function () {
  this.slow(5000);
  this.timeout(20000);
  it("incorrectly lists RecordTypes of PersonAccount on Account", async () => {
    const org = await Org.create({});
    const conn = org.getConnection();
    const fileProperties = await listRecordTypes(conn);
    const personAccountRecordType = fileProperties.find((rt) =>
      /.*\.PersonAccount/.test(rt.fullName)
    );
    expect(personAccountRecordType?.fullName).to.deep.equal(
      "Account.PersonAccount"
    );
  });
});
