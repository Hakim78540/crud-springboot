package com.example.crudspringboot.controller;

import com.example.crudspringboot.entity.Person;
import com.example.crudspringboot.repo.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/persons")

public class PersonWebController {

    @Autowired
    private PersonRepository personRepository;

    @GetMapping
    public String listPersons(Model model) {
        model.addAttribute("persons", personRepository.findAll());
        return "person-list";
    }

    @GetMapping("/new")
    public String showCreateForm(Model model) {
        model.addAttribute("person", new Person());
        return "person-form";
    }

    @PostMapping
    public String savePerson(@ModelAttribute Person person) {
        personRepository.save(person);
        return "redirect:/persons";
    }

    @GetMapping("/edit/{id}")
    public String editPerson(@PathVariable Long id, Model model) {
        model.addAttribute("person", personRepository.findById(id).orElseThrow());
        return "person-form";
    }

    @GetMapping("/delete/{id}")
    public String deletePerson(@PathVariable Long id) {
        personRepository.deleteById(id);
        return "redirect:/persons";
    }

}
