package com.example.demo.web.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * @author skkim
 * @since 2020. 10. 24.
 */
@Entity
@Table(name = "event_test")
@Getter
@Setter
public class EventTest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @Column
    private Long degree;

    @Column
    private String net;

    @Column
    private Long wait;

    @Column
    private LocalDateTime dt;
}
