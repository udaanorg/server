import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import Kitchen from './Kitchen';

@Entity('monthlyLogs')
class MonthlyLog extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id

    @ManyToOne(() => Kitchen)
    kitchen

    @CreateDateColumn()
    entryDate

    @Column({type: 'varchar'})
    materialName

    @Column({type: 'int'})
    quantityBought

    @Column({type: 'int'})
    quantityLeft
}

export default MonthlyLog;
