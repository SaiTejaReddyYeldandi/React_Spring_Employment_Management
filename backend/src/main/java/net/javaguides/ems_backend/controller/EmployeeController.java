package net.javaguides.ems_backend.controller;

import lombok.AllArgsConstructor;
import net.javaguides.ems_backend.dto.EmployeeDto;
import net.javaguides.ems_backend.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController // Now this class with @RC then spring MVC makes this access to http requests
@RequestMapping("/api/employees")// this makes as a base for the urls
public class EmployeeController {

    // first we inject the dependencies
    private EmployeeService employeeService;

    // Build ADD Employee REST API
    @PostMapping
    public ResponseEntity<EmployeeDto>  createEmployee(@RequestBody EmployeeDto employeeDto){
        EmployeeDto savedEmployee= employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }


    // Build Get Employee REST API

    @GetMapping("{id}")
    public  ResponseEntity<EmployeeDto> getEmployee(@PathVariable("id") Long employeeId){
        EmployeeDto employeeDto= employeeService.getEmployeebyId(employeeId);
        return ResponseEntity.ok(employeeDto);
    }

// Build Get all employees REST API

    @GetMapping
    public  ResponseEntity<List<EmployeeDto>> getAllEmployees(){
        List<EmployeeDto> employees= employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    // Build Update employee REST API
    @PutMapping("{id}")
    public  ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId,
                                                       @RequestBody EmployeeDto updatedEmployee){

        EmployeeDto employeeDto=employeeService.updateEmployee(employeeId,updatedEmployee );
        return ResponseEntity.ok(employeeDto);
    }

    // Build delete REST API

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId){
        employeeService.deleteEmployee(employeeId);
        return  ResponseEntity.ok("Employee deleted successfully");
    }
}
