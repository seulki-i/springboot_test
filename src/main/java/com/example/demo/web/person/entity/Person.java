package com.example.demo.web.person.entity;

import javax.persistence.*;

/**
 * @author skkim
 * @since 2020-12-20
 */
@Table
@Entity
public class Person {
    @Id
    @Column(name = "personId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long personId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "age")
    private int age;
}
