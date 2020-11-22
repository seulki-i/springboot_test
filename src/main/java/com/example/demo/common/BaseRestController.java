package com.example.demo.common;

import org.springframework.http.ResponseEntity;

import java.util.List;

/**
 * @author skkim
 * @since 2020-11-22
 */
public class BaseRestController {
    protected ResponseEntity<ApiResponse> ok() {
        return ResponseEntity.ok(ApiResponse.ok(1));
    }

    protected ResponseEntity<ApiResponse> ok(ApiResponse apiResponse) {
        return ResponseEntity.ok(apiResponse);
    }

    protected ResponseEntity<ApiResponse> ok(Object object) {
        return ResponseEntity.ok(ApiResponse.ok(object));
    }

    protected ResponseEntity<ApiResponse> ok(List list) {
        return ResponseEntity.ok(ApiResponse.ok(list));
    }
}
