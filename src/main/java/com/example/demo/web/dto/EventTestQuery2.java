package com.example.demo.web.dto;

import com.example.demo.common.PageRequestDTO;
import lombok.Getter;
import lombok.Setter;

/**
 * @author skkim
 * @since 2020-12-06
 */
@Getter @Setter
public class EventTestQuery2 extends PageRequestDTO {
    private String net;
    //0 , 10
    public int getStartPage(int page, int pageSize) {
        return page * pageSize;
    }
    //10, 20
    public int getEndPage(int page, int pageSize) {
        return (page + 1) * pageSize;
    }

}
