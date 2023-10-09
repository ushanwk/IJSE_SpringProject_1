package lk.ijse.spring.service.impl;


import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.repo.CustomerRepo;
import lk.ijse.spring.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepo repo;

    @Autowired
    ModelMapper mapper;

    @Override
    public void addCustomer(CustomerDTO dto) {
       repo.save(mapper.map(dto, Customer.class));
    }

    @Override
    public void deleteCustomer(String id) {

    }

    @Override
    public List<CustomerDTO> getAllCustomer() {
        return null;
    }

    @Override
    public CustomerDTO findCustomer(String id) {
        return null;
    }

    @Override
    public void updateCustomer(CustomerDTO c) {

    }
}
