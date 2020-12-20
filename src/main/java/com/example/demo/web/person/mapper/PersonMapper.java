package com.example.demo.web.person.mapper;

import com.example.demo.web.person.dto.PersonQuery;
import com.example.demo.web.person.dto.PersonVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author skkim
 * @since 2020-12-20
 */
@Mapper
public interface PersonMapper {
    List<PersonVO> findAll(PersonQuery query);

    Long findAllTotalCount(PersonQuery query);
}
