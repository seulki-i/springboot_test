package com.example.demo.web.person;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author skkim
 * @since 2020-12-20
 */
@Controller
public class PersonController {
    @GetMapping("/person/findAll")
    public ModelAndView findAll() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("web/person/findAll");
        return modelAndView;
    }
}
