package com.achievers.onlineshop;

import com.achievers.onlineshop.configs.ApplicationInitialDataRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class OnlineshopApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlineshopApplication.class, args);
	}

	@Bean
	public ApplicationInitialDataRunner schedulerRunner() {
		return new ApplicationInitialDataRunner();
	}

}
