package wi.wiwi.employeemanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wi.wiwi.employeemanager.exception.UserNotFoundException;
import wi.wiwi.employeemanager.model.Employee;
import wi.wiwi.employeemanager.repo.EmployeeRepo;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;
import java.util.UUID;

@Service
public class EmployeeService {
    private final EmployeeRepo employeerepo;

    @Autowired
    public EmployeeService(EmployeeRepo employeerepo) {
        this.employeerepo = employeerepo;
    }
    public Employee addEmployee(Employee employee){
        employee.setEmployeeCode(UUID.randomUUID().toString());
        return employeerepo.save(employee);
    }
    public List<Employee> findAllEmployees(){
        return employeerepo.findAll();
    }
    public Employee updateEmployee(Employee employee){
        return employeerepo.save(employee);
    }
    public Employee findEmployeeById(Long id){
        return employeerepo.findEmployeeById(id).orElseThrow(() -> new UserNotFoundException("user by id" +id+"was not found"));
    }

    public void deleteEmployee(Long id){
        employeerepo.deleteEmployeeById(id);
    }
}
