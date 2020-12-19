package com.example.demo.web.controller;

import com.example.demo.web.dto.EventTestDTO;
import com.example.demo.web.dto.EventTestQuery;
import com.example.demo.web.dto.EventTestVO;
import com.example.demo.web.service.EventTestService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
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


//    @GetMapping("/web/findAll")
//    public Page<EventTestDTO> getList(@ModelAttribute EventTestJooqQuery query) {
//        return eventTestService.getList(query);
//    }

    @GetMapping("/web/findAll")
    public Page<EventTestDTO> getList(@ModelAttribute EventTestQuery query) {
        return eventTestService.getList2(query);
    }

    @GetMapping("/web/lastList")
    public List<EventTestVO> findLastList() {
        return eventTestService.findLastList();
    }

    @GetMapping("/web/findTenList")
    public List<EventTestVO> findTenList() {
        return eventTestService.findTenList();
    }
}
