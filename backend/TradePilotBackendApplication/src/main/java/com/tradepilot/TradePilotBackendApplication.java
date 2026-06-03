package com.tradepilot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.tradepilot")
public class TradePilotBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(TradePilotBackendApplication.class, args);
    }
}
