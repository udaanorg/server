import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Kitchen from './Kitchen';

@Entity('users')
class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id

    @ManyToOne(() => Kitchen)
    kitchen

    @Column({type: 'varchar'})
    name

    @Column({type: 'date'})
    dateOfBirth

    @Column({type: 'varchar'})
    email

    @Column({type: 'binary', length: 60})
    password
}

export default User;
