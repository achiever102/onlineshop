# onlineshop
### Deployment procedure:
1. Create the database by running the below commands:
```
drop database if exists online_store_db;
create database online_store_db;
```

2. Clone the project from GitHub:
```
git clone git@github.com:achiever102/onlineshop.git
```

3. Create an AWS S3 bucket to store application images:
* Login to AWS
* Go to S3 service
  ![image001](https://screenshots-bucket-38293.s3.amazonaws.com/001.png)
  * Click on Create Bucket:
  ![image002](https://screenshots-bucket-38293.s3.amazonaws.com/002.png)
  * Enter bucket name and make the bucket public:
  ![image003](https://screenshots-bucket-38293.s3.amazonaws.com/003.png)
* Click on the created bucket:
  ![image004](https://screenshots-bucket-38293.s3.amazonaws.com/004.png)
  ![image005](https://screenshots-bucket-38293.s3.amazonaws.com/005.png)
  ![image006](https://screenshots-bucket-38293.s3.amazonaws.com/006.png)
* Click on Permissions:
  ![image007](https://screenshots-bucket-38293.s3.amazonaws.com/007.png)
* Scroll down to bucket policy and click on edit:
  ![image008](https://screenshots-bucket-38293.s3.amazonaws.com/008.png)
* Copy the bucket ARN:
  ![image009](https://screenshots-bucket-38293.s3.amazonaws.com/009.png)
* Replace the existing policy with the below and make sure to replace the highlighted ARN with yours:
  ![image010](https://screenshots-bucket-38293.s3.amazonaws.com/010.png)
* Click on save changes:
  ![image011](https://screenshots-bucket-38293.s3.amazonaws.com/011.png)
* Go to bucket properties and copy the bucket region and bucket name:
  ![image012](https://screenshots-bucket-38293.s3.amazonaws.com/012.png)
* Create AWS access key:
  * Click on the user’s drop down list and click on Security Credentials:
    ![image013](https://screenshots-bucket-38293.s3.amazonaws.com/013.png)
    * Click on create new access key:
    ![image014](https://screenshots-bucket-38293.s3.amazonaws.com/014.png)
* Open the downloaded CSV file and copy the access key and secret key.

4. Open the backend project in IntelliJ and create a file with name aws.config.properties in the directory: src/main/resources then add the below parameters to the file:
```
accesskey=access key from the downloaded file
secretKey=secret key from the downloaded file
bucketName=bucket name
bucketUrl=https://bucket-name.s3.region.amazonaws.com/
region=region
```

5. Update the below parameters in src/main/resources/application.properties file to use spring email:
```
spring.mail.username=
spring.mail.password=
```

6. Download and install JDK 11

7. Start the backend project in IntelliJ

8. Start the frontend project in VSCode and run the commands:
```
npm install 
npm start
```

9. you can login to the application using the manager username and password: manager/password
