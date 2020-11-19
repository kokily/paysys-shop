import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
class Item extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  num!: number;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text' })
  divide!: string;

  @Column({ type: 'text' })
  native!: string;

  @Column({ type: 'text' })
  unit!: string;

  @Column()
  price!: number;

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  created_at!: Date;

  @Column({ type: 'timestamptz' })
  @UpdateDateColumn()
  updated_at!: Date;
}

export default Item;
