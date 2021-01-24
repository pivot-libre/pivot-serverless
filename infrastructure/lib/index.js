import S3Stack from "./S3Stack";
import CognitoStack from "./CognitoStack";

// Add stacks
export default function main(app) {

  const s3 = new S3Stack(app, "s3");

  //new CognitoStack(app, "cognito", { bucketArn: s3.bucket.bucketArn });
}
