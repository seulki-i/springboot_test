package com.example.demo.web.person.controller;

import com.example.demo.web.person.dto.PersonQuery;
import com.example.demo.web.person.dto.PersonVO;
import com.example.demo.web.person.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author skkim
 * @since 2020-12-20
 */
@RestController
@RequiredArgsConstructor
public class PersonRestController {

    private final PersonService personService;

    @GetMapping("/web/person/findAll")
    public Page<PersonVO> getList(@ModelAttribute PersonQuery query) {
        return personService.getList(query);
    }
}
