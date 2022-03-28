package com.achievers.onlineshop.aws.bucket;

public enum BucketConfig {
    BUCKET_NAME("wfisher-sw-project-image-upload-001", "https://wfisher-sw-project-image-upload-001.s3.us-east-2.amazonaws.com/");

    private final String bucketName;
    private final String bucketUrl;

    BucketConfig(String bucketName, String bucketUrl) {
        this.bucketName = bucketName;
        this.bucketUrl = bucketUrl;
    }

    public String getBucketName() {
        return bucketName;
    }

    public String getBucketUrl() {
        return bucketUrl;
    }
}
