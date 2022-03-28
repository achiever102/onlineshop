package com.achievers.onlineshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
public class OnlineshopApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlineshopApplication.class, args);
	}

	@Bean
	public ApplicationStartupRunner schedulerRunner() {
		return new ApplicationStartupRunner();
	}
}
