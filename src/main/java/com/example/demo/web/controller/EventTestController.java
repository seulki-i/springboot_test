package com.example.demo.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author skkim
 * @since 2020. 10. 24.
 */
@Controller
public class EventTestController {

    @GetMapping("/findAll")
    public ModelAndView findAll() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("web/findAll");
        return modelAndView;
    }

    @GetMapping("/table")
    public ModelAndView table() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("web/table");
        return modelAndView;
    }
}
