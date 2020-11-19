import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import User from './User';

@Entity()
class Wedding extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  husband!: string;

  @Column({ type: 'text' })
  bride!: string;

  @Column()
  reserve_pay!: number;

  @Column()
  husband_rental!: number;

  @Column()
  bride_rental!: number;

  @Column()
  sum_rental!: number;

  @Column()
  husband_company!: number;

  @Column()
  bride_company!: number;

  @Column()
  sum_company!: number;

  @Column()
  husband_add!: number;

  @Column()
  bride_add!: number;

  @Column()
  sum_add!: number;

  @Column()
  husband_today!: number;

  @Column()
  bride_today!: number;

  @Column()
  sum_today!: number;

  @Column()
  husband_bouquet!: number;

  @Column()
  bride_bouquet!: number;

  @Column()
  sum_bouquet!: number;

  @Column()
  husband_ceremony!: number;

  @Column()
  bride_ceremony!: number;

  @Column()
  sum_ceremony!: number;

  @Column()
  husband_hanbok!: number;

  @Column()
  bride_hanbok!: number;

  @Column()
  sum_hanbok!: number;

  @Column()
  husband_play!: number;

  @Column()
  bride_play!: number;

  @Column()
  sum_play!: number;

  @Column()
  husband_anthem!: number;

  @Column()
  bride_anthem!: number;

  @Column()
  sum_anthem!: number;

  @Column()
  husband_moderator!: number;

  @Column()
  bride_moderator!: number;

  @Column()
  sum_moderator!: number;

  @Column()
  husband_officiate!: number;

  @Column()
  bride_officiate!: number;

  @Column()
  sum_officiate!: number;

  @Column()
  husband_etc!: number;

  @Column()
  bride_etc!: number;

  @Column()
  sum_etc!: number;

  @Column()
  husband_conv!: number;

  @Column()
  bride_conv!: number;

  @Column()
  sum_conv!: number;

  @Column()
  husband_wedding!: number;

  @Column()
  bride_wedding!: number;

  @Column()
  sum_wedding!: number;

  @Column()
  meals_price!: number;

  @Column()
  husband_num!: number;

  @Column()
  bride_num!: number;

  @Column()
  sum_num!: number;

  @Column()
  husband_meal!: number;

  @Column()
  bride_meal!: number;

  @Column()
  sum_meal!: number;

  @Column({ nullable: true })
  present_price!: number;

  @Column({ nullable: true })
  husband_present_num!: number;

  @Column({ nullable: true })
  bride_present_num!: number;

  @Column({ nullable: true })
  sum_present_num!: number;

  @Column({ nullable: true })
  husband_present!: number;

  @Column({ nullable: true })
  bride_present!: number;

  @Column({ nullable: true })
  sum_present!: number;

  @Column({ type: 'text' })
  meal!: string;

  @Column({ type: 'text' })
  reserve!: string;

  @Column({ type: 'text', nullable: true })
  present!: string;

  @Column()
  husband_reserve!: number;

  @Column()
  bride_reserve!: number;

  @Column({ type: 'text' })
  wedding_at!: string;

  @Column({ type: 'text' })
  event_at!: string;

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  created_at!: Date;

  @Column({ type: 'timestamptz' })
  @UpdateDateColumn()
  updated_at!: Date;

  // Relations
  @Column({ nullable: true })
  user_id!: string;

  @ManyToOne((type) => User, (user) => user.weddings)
  user!: User;
}

export default Wedding;
