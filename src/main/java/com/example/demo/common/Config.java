package com.example.demo.common;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author skkim
 * @since 2020. 10. 24.
 */
@Configuration
public class Config {
	  @Bean
	   public ModelMapper modelMapper() {
	      return new ModelMapper();
	   }
}
