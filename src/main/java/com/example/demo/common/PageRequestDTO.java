package com.example.demo.common;

import lombok.Getter;
import lombok.Setter;

/**
 * @author skkim
 * @since 2020-12-06
 */
@Getter
@Setter
public class PageRequestDTO {
    private int page = 0;
    private int pageSize = 10;

    //0 , 10
    public int getStartPage(int page, int pageSize) {
        return (page - 1) * pageSize;
    }

    //10, 20
    public int getEndPage(int page, int pageSize) {
        return page * pageSize;
    }
}
