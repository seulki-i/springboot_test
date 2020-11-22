package com.example.demo.common;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * @author skkim
 * @since 2020-11-22
 */
public enum ApiStatus {
    @JsonProperty("SUCCESS")
    SUCCESS,
    @JsonProperty("FAILURE")
    FAILURE,
    @JsonProperty("BAD_CREDENTIAL")
    BAD_CREDENTIAL,
    @JsonProperty("BAD_REQUEST")
    BAD_REQUEST
}
