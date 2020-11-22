package com.example.demo.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Objects;

/**
 * @author skkim
 * @since 2020-11-22
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse {
    private ApiStatus apiStatus;
    private List resultList;
    private Object resultObject;
    private Object pageInfo;
    private Integer resultCount;
    private String message;

    public static ApiResponse ok(List resultList) {
        return ApiResponse.of(ApiStatus.SUCCESS, resultList);
    }

    public static ApiResponse ok(Object resultObject) {
        return ApiResponse.of(ApiStatus.SUCCESS, resultObject);
    }

    public static ApiResponse ok(Integer resultCount) {
        return ApiResponse.of(ApiStatus.SUCCESS, resultCount);
    }

    public static ApiResponse ok(List resultList, Integer resultCount) {
        return ApiResponse.of(ApiStatus.SUCCESS, resultList, resultCount);
    }

    private static ApiResponse of(ApiStatus apiStatus) {
        return ApiResponse.builder()
                .apiStatus(apiStatus)
                .build();
    }

    private static ApiResponse of(ApiStatus apiStatus, String message) {
        return ApiResponse.builder()
                .apiStatus(apiStatus)
                .message(message)
                .build();
    }

    private static ApiResponse of(ApiStatus apiStatus, List resultList, String message) {
        return ApiResponse.builder()
                .apiStatus(apiStatus)
                .resultList(resultList)
                .message(message)
                .build();
    }

    private static ApiResponse of(ApiStatus apiStatus, List resultList) {
        return ApiResponse.builder()
                .apiStatus(apiStatus)
                .resultList(resultList)
                .resultCount(resultList.size())
                .build();
    }

    private static ApiResponse of(ApiStatus apiStatus, Object resultObject) {
        return ApiResponse.builder()
                .apiStatus(apiStatus)
                .resultObject(resultObject)
                .resultCount(Objects.nonNull(resultObject) ? 1 : 0)
                .build();
    }

    private static ApiResponse of(ApiStatus apiStatus, Object resultObject, String message) {
        return ApiResponse.builder()
                .apiStatus(apiStatus)
                .resultObject(resultObject)
                .message(message)
                .resultCount(Objects.nonNull(resultObject) ? 1 : 0)
                .build();
    }

    private static ApiResponse of(ApiStatus apiStatus, Integer resultCount) {
        return ApiResponse.builder()
                .apiStatus(apiStatus)
                .resultCount(resultCount)
                .build();
    }

    private static ApiResponse of(ApiStatus apiStatus, List resultList, Integer resultCount) {
        return ApiResponse.builder()
                .apiStatus(apiStatus)
                .resultList(resultList)
                .resultCount(resultCount)
                .build();
    }
}
