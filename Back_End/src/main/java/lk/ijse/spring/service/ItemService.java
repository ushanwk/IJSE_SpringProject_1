package lk.ijse.spring.service;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.ItemDTO;

import java.util.List;

public interface ItemService {

    void addItem(ItemDTO dto);

    void deleteItem(String id);

    List<ItemDTO> getAllItem();

    CustomerDTO findItem(String code);

    void updateItem(ItemDTO dto);

}
