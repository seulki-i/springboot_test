package com.example.demo.web.service;

import com.example.demo.web.dao.EventTestRepository;
import com.example.demo.web.dto.EventTestVO;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author skkim
 * @since 2020. 10. 24.
 */
@Service
@RequiredArgsConstructor
public class EventTestService {

    private final ModelMapper modelMapper;
    private final EventTestRepository eventTestRepository;
//	private final EventTestMapper eventTestMapper;


    public List<EventTestVO> findAll() {
        return eventTestRepository.findAll().stream().map(v -> modelMapper.map(v, EventTestVO.class))
                .collect(Collectors.toList());
    }


}
