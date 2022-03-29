package com.achievers.onlineshop.aws.config;

import com.achievers.onlineshop.configs.ApplicationConfiguration;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AmazonConfig {

    @Autowired
    private ApplicationConfiguration applicationConfiguration;

    @Bean
    public AmazonS3 s3(){
        AWSCredentials awsCredentials = new BasicAWSCredentials(
                applicationConfiguration.getAccessKey(),
                applicationConfiguration.getSecretKey()
        );

        return AmazonS3ClientBuilder
                .standard()
                .withRegion(applicationConfiguration.getRegion())
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();
    }

}
