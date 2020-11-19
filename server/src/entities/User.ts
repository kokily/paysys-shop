import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import Cart from './Cart';
import Bill from './Bill';
import Wedding from './Wedding';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  username!: string;

  @Column({ type: 'text' })
  password!: string;

  @Column({ type: 'boolean' })
  admin!: boolean;

  @Column({ type: 'int', default: 0 })
  token_version!: number;

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  created_at!: Date;

  @Column({ type: 'timestamptz' })
  @UpdateDateColumn()
  updated_at!: Date;

  private hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
  };

  public setPassword = async (password: string): Promise<void> => {
    this.password = await this.hashPassword(password);
  };

  public validPassword = async (password: string): Promise<boolean> => {
    return await bcrypt.compare(password, this.password);
  };

  // Relations
  @OneToMany((type) => Cart, (cart) => cart.user_id)
  carts!: [Cart];

  @OneToMany((type) => Bill, (bill) => bill.user_id)
  bills!: [Bill];

  @OneToMany((type) => Wedding, (wedding) => wedding.user_id)
  weddings!: [Wedding];
}

export default User;
