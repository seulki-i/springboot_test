package com.example.demo.web.mapper;

import com.example.demo.web.dto.EventTestDTO;
import com.example.demo.web.dto.EventTestQuery;
import com.example.demo.web.dto.EventTestVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author skkim
 * @since 2020. 10. 24.
 */
@Mapper
public interface EventTestMapper {
    List<EventTestDTO> findAll(EventTestQuery search);

    Long findAllTotalCount(EventTestQuery search);

    List<EventTestVO> findLastList();

    List<EventTestVO> findTenList();
}
