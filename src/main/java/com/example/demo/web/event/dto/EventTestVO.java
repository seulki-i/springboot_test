package com.example.demo.web.event.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * @author skkim
 * @since 2020. 10. 24.
 */
@Getter
@Setter
public class EventTestVO {
    private Long idx;

    private Long degree;

    private String net;

    private Long wait;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dt;
}
