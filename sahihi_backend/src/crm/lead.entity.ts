import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Customer } from './crm.entity';

@Entity()
export class Lead {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    interactionType: string; // e.g., 'call', 'email'

    @Column()
    notes: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    interactionDate: Date;

    @ManyToOne(() => Customer, customer => customer.leads)
    customer: Customer;
}
