export CDK_ATMOSPHERE_ENDPOINT="https://us-east-1.gamma.cdk-atmosphere.dev-tools.aws.dev"
export CDK_ATMOSPHERE_POOL="__exp.aws-cdk-lib-integ-test-automation__"

CREDS=$(aws sts assume-role \
--role-arn  arn:aws:iam::171014003109:role/Ops-GitHubActionsDeploymentI-AtmosphereRole941B56C2-vIX71gxi8jVx \
--role-session-name run-tests@aws-cdk-deployment-integ)

# Parse the JSON output and set environment variables
export AWS_ACCESS_KEY_ID=$(echo $CREDS | jq -r '.Credentials.AccessKeyId')
export AWS_SECRET_ACCESS_KEY=$(echo $CREDS | jq -r '.Credentials.SecretAccessKey')
export AWS_SESSION_TOKEN=$(echo $CREDS | jq -r '.Credentials.SessionToken')

node $(dirname "$0")/bin/deployment-integ.js