import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import { IOrdersProducts } from "@modules/orders/domain/models/IOrdersProducts";
import Product from "@modules/products/infra/typeorm/entities/Product";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import Order from "./Order";

@Entity("orders_products")
class OrdersProducts implements IOrdersProducts {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column("decimal")
    price: number;
    @Column("int")
    quantity: number;
    @ManyToOne(() => Order, order => order.order_products)
    @JoinColumn({ name: "order_id" })
    order: Order;
    @ManyToOne(() => Product, product => product.order_products)
    @JoinColumn({ name: "product_id" })
    product: Product;
    @Column()
    order_id: string;
    @Column()
    product_id: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}

export default OrdersProducts;