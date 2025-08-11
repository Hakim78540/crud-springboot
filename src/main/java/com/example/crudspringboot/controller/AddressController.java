package com.example.crudspringboot.controller;

import com.example.crudspringboot.entity.Address;
import com.example.crudspringboot.repo.AddressRepository;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {

    private final AddressRepository addressRepository;

    public AddressController(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @GetMapping
    public ResponseEntity<List<Address>> getAll() {
        return ResponseEntity.ok(addressRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Address> getById(@PathVariable Long id) {
        return addressRepository.findById(id)
                .map(address -> ResponseEntity.ok(address))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Address> create(@RequestBody Address address) {
        Address saved = addressRepository.save(address);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Address> update(@PathVariable Long id, @RequestBody Address data) {
        Optional<Address> existing = addressRepository.findById(id);
        if (existing.isPresent()) {
            Address addr = existing.get();
            addr.setStreet(data.getStreet());
            addr.setCity(data.getCity());
            addr.setZipCode(data.getZipCode());
            return ResponseEntity.ok(addressRepository.save(addr));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (addressRepository.existsById(id)) {
            addressRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
