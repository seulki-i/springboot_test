package com.example.demo.web.event.controller;

import com.example.demo.web.event.dto.EventTestVO;
import com.example.demo.web.event.service.EventTestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author skkim
 * @since 2020. 10. 24.
 */
@RestController
@RequiredArgsConstructor
public class EventTestRestController {
    private final EventTestService eventTestService;

//    @GetMapping("/web/findAll")
//    public List<EventTestVO> findAll() {
//        return eventTestService.findAll();
//    }

    @GetMapping("/web/event/lastList")
    public List<EventTestVO> findLastList() {
        return eventTestService.findLastList();
    }

    @GetMapping("/web/event/findTenList")
    public List<EventTestVO> findTenList() {
        return eventTestService.findTenList();
    }
}
