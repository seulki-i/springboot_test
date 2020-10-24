package com.example.demo.web.dao;

import com.example.demo.web.entity.EventTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author skkim
 * @since 2020. 10. 24.
 */
@Repository
public interface EventTestRepository extends JpaRepository<EventTest, Long> {

}
