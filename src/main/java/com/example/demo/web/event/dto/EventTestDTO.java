package com.example.demo.web.event.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * @author skkim
 * @since 2020. 11. 14.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventTestDTO {
    private Long idx;

    private Long degree;

    private String net;

    private Long wait;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dt;

    public static EventTestDTO of(EventTestDTO data) {
        EventTestDTO eventTestDTO = new EventTestDTO();
        eventTestDTO.setIdx(data.idx);
        eventTestDTO.setDegree(data.degree);
        eventTestDTO.setNet(data.getNet());
        eventTestDTO.setWait(data.getWait());
        return eventTestDTO;
    }
//
//    //0 , 10
//    public int getStartPage(int page, int pageSize) {
//        return page * pageSize;
//    }
//
//    //10, 20
//    public int getEndPage(int page, int pageSize) {
//        return (page + 1) * pageSize;
//    }
}
