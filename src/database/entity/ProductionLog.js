import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import Kitchen from './Kitchen';

@Entity('productionLogs')
class ProductionLog extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id

    @ManyToOne(() => Kitchen)
    kitchen

    @CreateDateColumn()
    entryDate

    @Column({type: 'int'})
    quantityUsed

    @Column({type: 'int'})
    quantityLeft

    @Column({type: 'int'})
    platesMade
}

export default ProductionLog;
