import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";

export default class S3Stack extends cdk.Stack {
  // Public reference to the S3 bucket
  bucket;

  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("S3Stack Scope");
    console.dir(scope);
    this.bucket = new s3.Bucket(this, "pivot", {
      // Allow client side access to the bucket from a different domain
      cors: [
        {
          maxAge: 3000,
          allowedOrigins: ["*"],
          allowedHeaders: ["*"],
          allowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
        },
      ],
    });

    // Export values
    new cdk.CfnOutput(this, "AttachmentsBucketName", {
      value: this.bucket.bucketName,
    });
  }
}
