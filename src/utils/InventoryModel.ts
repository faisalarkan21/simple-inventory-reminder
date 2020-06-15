import {v1 as uuidV1} from 'uuid';

interface Inventory {
  name: string;
  photo: string;
  quantity: number;
  price: number;
  brand: string;
  description: string;
  priority: number;
  createdAt?: Date;
  updatedAt?: Date;
  id?: string;
}

export default class InventoryModel {
  id: string;
  name: string;
  photo: string;
  quantity: number;
  price: number;
  brand: string;
  description: string;
  priority: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(inventory: Inventory) {
    this.id = uuidV1();
    this.name = inventory.name;
    this.photo = inventory.photo;
    this.quantity = inventory.quantity || 1;
    this.price = inventory.price || 0;
    this.brand = inventory.brand;
    this.description = inventory.description;
    this.priority = inventory.priority;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
