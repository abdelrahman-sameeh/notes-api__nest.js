import { User } from "src/auth/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Note{
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => User)
  user: User
  
  @Column()
  title: string;
  
  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
}

