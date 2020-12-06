package com.example.demo.common;

import lombok.Getter;
import lombok.Setter;

/**
 * @author skkim
 * @since 2020-12-06
 */
@Getter @Setter
public class PageRequestDTO {
    private int page = 0;
    private int pageSize = 10;
}
