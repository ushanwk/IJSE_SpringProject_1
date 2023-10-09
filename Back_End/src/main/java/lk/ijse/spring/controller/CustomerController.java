package lk.ijse.spring.controller;

import lk.ijse.spring.Util.ResponseUtil;
import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("customer")
@CrossOrigin
public class CustomerController {

    @Autowired
    CustomerService service;

    @PostMapping
    public ResponseUtil addCustomer(CustomerDTO dto){
        service.addCustomer(dto);
        return new ResponseUtil("Ok", "Successfully Added", dto);
    }

}
