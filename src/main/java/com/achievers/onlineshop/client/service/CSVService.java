package com.achievers.onlineshop.client.service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

import com.achievers.onlineshop.admin.model.License;
import com.achievers.onlineshop.admin.repository.LicensesRepository;
import com.achievers.onlineshop.admin.service.ItemService;
import com.achievers.onlineshop.aws.bucket.BucketConfig;
import com.achievers.onlineshop.aws.filestore.FileStore;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.QuoteMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CSVService {
    @Autowired
    private LicensesRepository licensesRepository;

    @Autowired
    private ItemService itemService;

    @Autowired
    private FileStore fileStore;

    @Autowired
    private BucketConfig bucketConfig;

    public String load(List<License> licenseList, String orderId) {

        ByteArrayInputStream file;

        final CSVFormat format = CSVFormat.DEFAULT.withQuoteMode(QuoteMode.MINIMAL);
        try (ByteArrayOutputStream out = new ByteArrayOutputStream();
             CSVPrinter csvPrinter = new CSVPrinter(new PrintWriter(out), format);) {
            for (License license : licenseList) {
                List<String> data = Arrays.asList(
                        itemService.getById(license.getItemId()).getItemName(),
                        license.getLicenseId()
                );
                csvPrinter.printRecord(data);
            }
            csvPrinter.flush();
            file = new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("Failed to create CSV file: " + e.getMessage());
        }

        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", "text/csv");
        metadata.put("Content-Length", String.valueOf(file.available()));
        String path = String.format("%s/%s", bucketConfig.getBucketName(), "orders");
        String fileName = String.format("%s", orderId + ".csv");

        fileStore.save(path, fileName, Optional.of(metadata), file);

        return bucketConfig.getBucketUrl() + "/orders/" + fileName;
    }
}