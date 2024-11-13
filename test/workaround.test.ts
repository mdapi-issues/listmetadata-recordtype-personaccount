import { expect } from "chai";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { fixPersonAccountRecordTypes } from "../src/workaround.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

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
const expected = JSON.parse(
  readFileSync(join(__dirname, "fixtures", "expected.json"), "utf8")
);
const actual = JSON.parse(
  readFileSync(join(__dirname, "fixtures", "actual.json"), "utf8")
);

describe("person-accounts", function () {
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
