package com.example.spring_boot.controller;
import com.example.spring_boot.model.Employee;
import com.example.spring_boot.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.*;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/employee/create")
    public ResponseEntity<String> createEmployee(@RequestBody Employee employee) {
        String response = employeeService.create(employee);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    @GetMapping("/employee/retrieveAll")
    public ResponseEntity<List<Employee>> getAllEmployee() {
        List<Employee> employees = employeeService.getAll();
        return new ResponseEntity<>(employees, HttpStatus.OK);

    }

    @PutMapping("/employee/update/{email}")
    public ResponseEntity<String> updateEmployee(@PathVariable("email") String email, @RequestBody Employee employee) {
        String response = employeeService.updateByEmail(email, employee);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @DeleteMapping("/employee/delete/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable int id) {
        String response = employeeService.deleteById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/employee/deleteAll")
    public ResponseEntity<String> deleteAllEmployee() {
        String response = employeeService.deleteAll();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/employee/login")
    public ResponseEntity<String> login(@RequestBody Employee loginEmployee){
        Employee employee = employeeService.getByEmail(loginEmployee.getEmail());
        if(employee!=null){
            if(employee.getPassword().equals(loginEmployee.getPassword())){
                return  ResponseEntity.status(HttpStatus.OK).body("login successful");
            }
            else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Password incorrect");
            }
            }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid email");


        }
    }

    @GetMapping("/employee/retrieve/{email}")
    public ResponseEntity<Employee> getUserByEmail(@PathVariable String email){
        Employee user =employeeService.getByEmail(email);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }



}


