package com.example.demo.web.person.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * @author skkim
 * @since 2020-12-20
 */
@Getter
@Setter
public class PersonVO {
    private long personId;

    private String firstName;

    private String lastName;

    private int age;
}
