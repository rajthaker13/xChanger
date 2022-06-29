export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "XChangerProject": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string",
            "CreatedSNSRole": "string"
        }
    },
    "storage": {
        "s3profilePictures": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "api": {
        "xchangerproject": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    }
}