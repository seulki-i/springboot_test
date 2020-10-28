package com.example.demo.web.mapper;

import com.example.demo.web.dto.EventTestVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author skkim
 * @since 2020. 10. 24.
 */
@Mapper
public interface EventTestMapper {
    List<EventTestVO> findAll();

    List<EventTestVO> findLastList();

    List<EventTestVO> findTenList();
}
