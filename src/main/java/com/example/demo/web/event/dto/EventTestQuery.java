package com.example.demo.web.event.dto;

import com.example.demo.common.PageRequestDTO;
import lombok.Getter;
import lombok.Setter;

/**
 * @author skkim
 * @since 2020-12-06
 */
@Getter
@Setter
public class EventTestQuery extends PageRequestDTO {
    private String net;
}
