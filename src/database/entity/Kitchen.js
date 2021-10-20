import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('kitchens')
class Kitchen extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id

    @Column({type: 'varchar'})
    state

    @Column({type: 'varchar'})
    city

    @Column({type: 'varchar'})
    area

    @Column({type: 'int'})
    pincode
}

export default Kitchen;
