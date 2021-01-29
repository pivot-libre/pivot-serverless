import S3Stack from "./S3Stack";
import CognitoStack from "./CognitoStack";
import StaticWebsiteStack from "./StaticWebsiteStack";

// Add stacks
export default function main(app) {
  console.log("Scope before s3 bucket");
  console.dir(app);
  const s3 = new S3Stack(app, "s3");
  console.log("Scope After S3 Bucket, before static site ");
  console.dir(app);
  const staticSite = new StaticWebsiteStack(app, 'pivot-static-site');
  //new CognitoStack(app, "cognito", { bucketArn: s3.bucket.bucketArn });
}
