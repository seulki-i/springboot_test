package com.example.demo.common;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
/**
 * @author skkim
 * @since 2020-11-22
 */
public class BaseDAO {
    public <T, S extends BaseQuery> Page<T> paging(List<T> resultList, S searchCondition, long count) {
        return new PageImpl<>(resultList, (Pageable) searchCondition.getPageRequest(), count);
    }

}
