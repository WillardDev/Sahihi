import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Lead } from './lead.entity';

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    companyName: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column({ default: 'active' })
    status: string; // e.g., 'active', 'inactive', 'lead'

    @OneToMany(() => Lead, lead => lead.customer, { cascade: true })
    leads: Lead[]; // A customer can have multiple leads (interactions)
}
