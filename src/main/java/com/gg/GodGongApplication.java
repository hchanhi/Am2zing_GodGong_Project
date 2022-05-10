package com.gg;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("com.gg.domain")
public class GodGongApplication {

    public static void main(String[] args) {
        SpringApplication.run(GodGongApplication.class, args);
    }

}
