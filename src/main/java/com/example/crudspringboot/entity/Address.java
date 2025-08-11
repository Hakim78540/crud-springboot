package com.example.crudspringboot;

import jakarta.persistence.*;

@Entity
@Table(name = "address")

public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String street;
    private String city;

    @OneToOne(mappedBy = "address")
    private Person person;

    //getters et setters

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

}
