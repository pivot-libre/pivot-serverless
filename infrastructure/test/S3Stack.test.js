import { expect, haveResource } from "@aws-cdk/assert";
import * as sst from "@serverless-stack/resources";
import S3Stack from "../lib/S3Stack";

test("Test Stack", () => {
  const app = new sst.App();
  // WHEN
  const stack = new S3Stack(app, "test-stack");
  // THEN
  expect(stack).to(
    haveResource("AWS::S3::Bucket")
  );
});
