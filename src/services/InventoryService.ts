import realm from 'realm';
import InventoryModel from '../utils/InventoryModel';

const schemaInventory = {
  name: 'Inventory',
  properties: {
    name: 'string',
    photo: 'string',
    quantity: {type: 'int', default: 0},
    price: {type: 'int', default: 0},
    brand: 'string',
    description: 'string',
    priority: {type: 'int', default: 0},
    createdAt: 'date',
    updatedAt: 'date',
    id: 'string',
  },
};

export default class InventoryService {
  save(inventory: InventoryModel) {
    realm
      .open({
        schema: [schemaInventory],
      })
      .then(realm => {
        realm.write(() => {
          realm.create('Inventory', inventory);
        });
      });
  }

  getAll() {
    return realm
      .open({
        schema: [schemaInventory],
      })
      .then(realm => {
        return realm.objects('Inventory');
      });
  }
}
