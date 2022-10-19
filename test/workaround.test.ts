import { expect } from "chai";
import { readFile } from "node:fs/promises";
import { join } from "path";
import { fixPersonAccountRecordTypes } from "../src/workaround";

const personAccountRecordTypes = [
  {
    DeveloperName: "Freelancer",
    SobjectType: "Account",
    IsPersonType: true,
  },
  {
    DeveloperName: "PersonAccount",
    SobjectType: "Account",
    IsPersonType: true,
  },
];

describe("person-accounts", function () {
  let expected, actual;
  before(async () => {
    expected = JSON.parse(
      await readFile(join(__dirname, "fixtures", "expected.json"), "utf8")
    );
    actual = JSON.parse(
      await readFile(join(__dirname, "fixtures", "actual.json"), "utf8")
    );
  });

  describe("fixPersonAccountRecordTypes", () => {
    it("fixes a PersonAccount RecordType being listed on Account", async () => {
      const result = fixPersonAccountRecordTypes(
        actual,
        personAccountRecordTypes
      );
      expect(result).to.deep.equal(expected);
    });
  });
});
