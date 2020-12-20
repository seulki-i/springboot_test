package com.example.demo.web.event.mapper;

import com.example.demo.web.event.dto.EventTestVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author skkim
 * @since 2020. 10. 24.
 */
@Mapper
public interface EventTestMapper {
    List<EventTestVO> findLastList();

    List<EventTestVO> findTenList();
}
