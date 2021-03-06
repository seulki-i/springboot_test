package com.example.demo.web.event.dto;

import com.example.demo.common.BaseQuery;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author skkim
 * @since 2020-11-22
 */
@Getter
@Setter
@NoArgsConstructor
public class EventTestJooqQuery extends BaseQuery {

    private String net;

    public boolean hasNet() {
        return has(this.net);
    }
}
