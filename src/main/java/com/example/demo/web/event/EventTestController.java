package com.example.demo.web.event;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author skkim
 * @since 2020. 10. 24.
 */
@Controller
public class EventTestController {

    @GetMapping("/event/table")
    public ModelAndView table() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("web/event/table");
        return modelAndView;
    }

    @GetMapping("/event/chart")
    public ModelAndView chart() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("web/event/chart");
        return modelAndView;
    }
}
