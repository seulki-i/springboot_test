package com.example.demo.web.dao;

import com.example.demo.common.BaseDAO;
//import com.example.demo.jooq.tables.JQEventTest;
//import com.example.demo.web.dto.EventTestDTO;
//import com.example.demo.web.dto.EventTestJooqQuery;
//import org.jooq.Condition;
//import org.jooq.DSLContext;
//import org.jooq.impl.DSL;
//import org.springframework.data.domain.Page;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static org.jooq.impl.DSL.selectOne;


/**
 * @author skkim
 * @since 2020-11-22
 */
@Repository
@RequiredArgsConstructor
public class EventTestDAO extends BaseDAO {
//    private final DSLContext jooq;
//
//    private final JQEventTest eventTest = JQEventTest.EVENT_TEST;
//
//    public Page<EventTestDTO> getEventTest(EventTestJooqQuery query){
//        Condition condition = DSL.trueCondition();
//
//        if(query.hasNet()){
//            condition = condition.and(eventTest.NET.contains(query.getNet()));
//        }
//
//        List<EventTestDTO> resultList = jooq.
//                select()
//                .from(eventTest)
//                .where(condition)
//                .limit(10)
//                .offset(query.getOffset()) //몇번째 row 부터 가져올껀지 query.getOffset()
//                .fetch()
//                .map(r -> new EventTestDTO(
//                        r.getValue(eventTest.IDX),
//                        r.getValue(eventTest.DEGREE),
//                        r.getValue(eventTest.NET),
//                        r.getValue(eventTest.WAIT),
//                        r.getValue(eventTest.DT)
//                ));
//
//        return paging(resultList, query, jooq.fetchCount(selectOne()
//                .from(eventTest)
//                .where(condition)));
//
//    }
}
