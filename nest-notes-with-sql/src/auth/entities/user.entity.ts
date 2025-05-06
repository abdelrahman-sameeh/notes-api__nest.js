import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

enum UserRoles {
  ADMIN="admin",
  USER="user",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  // @Index({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({type: "enum", enum: UserRoles, default: UserRoles.USER})
  role: UserRoles

}
