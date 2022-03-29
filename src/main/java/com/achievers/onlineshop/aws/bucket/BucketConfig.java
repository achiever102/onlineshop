package com.achievers.onlineshop.aws.bucket;

import com.achievers.onlineshop.configs.ApplicationConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BucketConfig {

    @Autowired
    private ApplicationConfiguration applicationConfiguration;

    /*BUCKET_NAME("wfisher-sw-project-image-upload-001", "https://wfisher-sw-project-image-upload-001.s3.us-east-2.amazonaws.com/");

    private final String bucketName;
    private final String bucketUrl;

    BucketConfig(String bucketName, String bucketUrl) {
        this.bucketName = bucketName;
        this.bucketUrl = bucketUrl;
    }*/

    public String getBucketName() {
        return applicationConfiguration.getBucketName();
    }

    public String getBucketUrl() {
        return applicationConfiguration.getBucketUrl();
    }
}
