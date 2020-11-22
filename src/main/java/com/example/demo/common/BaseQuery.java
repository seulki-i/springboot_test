package com.example.demo.common;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

import static java.util.Objects.nonNull;
import static org.apache.commons.lang3.ObjectUtils.isNotEmpty;
import static org.apache.commons.lang3.StringUtils.isNoneBlank;


/**
 * @author skkim
 * @since 2020-11-22
 */
@Getter
@Setter
@NoArgsConstructor
public class BaseQuery {
    protected Integer currentPage;
    protected Integer rowsPerPage; //10
    protected Integer offset;

    protected Object rowBounds; // MyBats
    protected Pageable pageRequest; // Spring Data JPA Paging

    public Integer getCurrentPage() {
        return this.currentPage;
    }

    public Integer getRowsPerPage() {
        return this.rowsPerPage;
    }

    public Object getRowBounds() {
        return this.rowBounds;
    }

    public void setCurrentPage(Integer currentPage) {
        this.currentPage = currentPage;
    }

    public void setRowsPerPage(Integer rowsPerPage) {
        this.rowsPerPage = rowsPerPage;
    }

    public void setRowBounds(Object rowBounds) {
        this.rowBounds = rowBounds;
    }

    protected <T> boolean has(T obj) {
        if (obj instanceof String) {
            return isNoneBlank((String) obj);
        } else if (obj instanceof List) {
            return isNotEmpty((List) obj);
        } else {
            return nonNull(obj);
        }
    }

    public Pageable getPageRequest(Sort sort) {
        return PageRequest.of(this.pageRequest.getPageNumber(), this.pageRequest.getPageSize(), sort);
    }
}
