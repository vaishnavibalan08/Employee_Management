package com.example.spring_boot.service;
import com.example.spring_boot.model.Employee;
import com.example.spring_boot.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private  EmployeeRepository employeeRepository;

    public String create(Employee employee){
        employeeRepository.save(employee);
        return "Employee created successfully";
    }

    public List<Employee> getAll(){
        return employeeRepository.findAll();
    }


    public Employee getByEmail(String email){
        Employee employee = employeeRepository.findByEmail(email);
        if(employee!=null){
            return employee;
        }
        else{
            return null;
        }

    }

    public String updateByEmail(String email,Employee updateEmployee){
        Employee existingEmployee = employeeRepository.findByEmail(email);
        if(existingEmployee !=null){
            existingEmployee.setName(updateEmployee.getName());
            existingEmployee.setDesignation(updateEmployee.getDesignation());
            existingEmployee.setAge(updateEmployee.getAge());
            existingEmployee.setPassword(updateEmployee.getPassword());
            employeeRepository.save(existingEmployee);
            return "Employee details updated successfully";
        }

        else{
            return "No record found with this id";
        }
    }

    public String deleteById(int id) {
        boolean exists = employeeRepository.existsById(id);
        if (exists == true) {
            employeeRepository.deleteById(id);
            return "Employee deleted with this id";
        } else {
            return "No record found with this id";
        }

    }

    public String deleteAll(){
        employeeRepository.deleteAll();
        return "All Employee records are deleted";
    }




}
