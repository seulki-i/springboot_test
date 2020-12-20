package com.example.demo.web.person.dto;

import com.example.demo.common.PageRequestDTO;
import lombok.Getter;
import lombok.Setter;

/**
 * @author skkim
 * @since 2020-12-20
 */
@Getter
@Setter
public class PersonQuery extends PageRequestDTO {
    private Long personId;

    private String firstName;

    private String lastName;

    private Long age;
}
