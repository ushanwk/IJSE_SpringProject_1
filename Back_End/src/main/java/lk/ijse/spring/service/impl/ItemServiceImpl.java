package lk.ijse.spring.service.impl;


import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.ItemDTO;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.entity.Item;
import lk.ijse.spring.repo.CustomerRepo;
import lk.ijse.spring.repo.ItemRepo;
import lk.ijse.spring.service.ItemService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ItemServiceImpl implements ItemService {

    @Autowired
    ItemRepo repo;

    @Autowired
    ModelMapper mapper;

    @Override
    public void addItem(ItemDTO dto) {
        repo.save(mapper.map(dto, Item.class));
    }

    @Override
    public void deleteItem(String id) {
        repo.deleteById(id);
    }

    @Override
    public List<ItemDTO> getAllItem() {
        return null;
    }

    @Override
    public CustomerDTO findItem(String code) {
        return null;
    }

    @Override
    public void updateItem(ItemDTO dto) {
        Item map = mapper.map(dto, Item.class);
        repo.save(map);
    }
}
