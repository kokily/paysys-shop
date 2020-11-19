import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Bill from './Bill';
import User from './User';

export interface InputItem {
  id: string;
  name: string;
  divide: string;
  native: string;
  unit: string;
  price: number;
  count: number;
  amount: number;
}

@Entity()
class Cart extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'jsonb' })
  items!: [InputItem];

  @Column({ default: false })
  completed!: boolean;

  @Column({ default: false })
  deleted!: boolean;

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  created_at!: Date;

  @Column({ type: 'timestamptz' })
  @UpdateDateColumn()
  updated_at!: Date;

  // Relations
  @Column({ nullable: true })
  user_id!: string;

  @ManyToOne((type) => User, (user) => user.carts)
  user!: User;

  @Column({ nullable: true })
  bill_id!: string;

  @OneToOne((type) => Bill, (bill) => bill.cart_id)
  bill!: Bill;
}

export default Cart;
