package com.achievers.onlineshop.aws.bucket;

public enum BucketConfig {
    BUCKET_NAME("update-bucket-name", "update-bucket-url");

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
