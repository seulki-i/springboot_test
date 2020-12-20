package com.example.demo.web.person.service;

import com.example.demo.web.person.dto.PersonQuery;
import com.example.demo.web.person.dto.PersonVO;
import com.example.demo.web.person.mapper.PersonMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author skkim
 * @since 2020-12-20
 */
@Service
@RequiredArgsConstructor
public class PersonService {
    private final PersonMapper personMapper;

    public Page<PersonVO> getList(PersonQuery query) {
        int page = query.getPage();
        int pageSize = query.getPageSize();
        query.setPage(query.getStartPage(page, pageSize)); //몇번째부터
        List<PersonVO> list = personMapper.findAll(query);
//        List<EventTestDTO> eventTestDTOList = list.stream().map(EventTestDTO::of).collect(Collectors.toList());
        Long totalSize = personMapper.findAllTotalCount(query);
        return new PageImpl(list, PageRequest.of((page - 1), pageSize), totalSize);
    }
}
