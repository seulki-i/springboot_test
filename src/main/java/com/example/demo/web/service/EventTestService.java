package com.example.demo.web.service;

import com.example.demo.web.dao.EventTestRepository;
import com.example.demo.web.dto.EventTestVO;

import com.example.demo.web.mapper.EventTestMapper;
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
	private final EventTestMapper eventTestMapper;


    public List<EventTestVO> findAll() {
        return eventTestRepository.findAll().stream().map(v -> modelMapper.map(v, EventTestVO.class))
                .collect(Collectors.toList());
    }

    //최근에 들어온 값을 가져오는 리스트 (같은 시간에 들어온 한 묶음)
    public List<EventTestVO> findLastList(){
        return eventTestMapper.findLastList();
    }

    //현재 시간을 기준으로 10분전꺼까지 가져오는 리스트
    public List<EventTestVO> findTenList(){
        return eventTestMapper.findTenList();
    }

}
