import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './crm.entity';
import { Lead } from './lead.entity';

@Injectable()
export class CrmService {
    constructor(
        @InjectRepository(Customer)
        private customerRepo: Repository<Customer>,
        @InjectRepository(Lead)
        private leadRepo: Repository<Lead>,
    ) {}

    async createCustomer(customerData: Partial<Customer>): Promise<Customer> {
        return this.customerRepo.save(customerData);
    }

    async updateCustomer(id: number, customerData: Partial<Customer>): Promise<Customer> {
        await this.customerRepo.update(id, customerData);
        return this.customerRepo.findOne({ where: { id } });
    }

    async getCustomers(query): Promise<Customer[]> {
        return this.customerRepo.find({ where: query });
    }

    async findOneById(id: string): Promise<Customer> {
        const customer = await this.customerRepo.findOneBy({ id: Number(id)});
        if(!customer) {
            throw new NotFoundException(`Customer with ID ${id} not found`);
        }
        return customer;
    }

    async remove(id: string): Promise<void> {
        const result = await this.customerRepo.delete({ id: Number(id)});
        if(result.affected === 0) {
            throw new NotFoundException(`User with ID ${id} not found!`);
        }
    }

    async addLead(leadData: Partial<Lead>): Promise<Lead> {
        const customer = await this.customerRepo.findOne({ where: { id: leadData.id } });
        if (!customer) {
            throw new Error('Customer not found');
        }

        const lead = new Lead();
        lead.interactionType = leadData.interactionType;
        lead.notes = leadData.notes;
        lead.customer = customer;

        return this.leadRepo.save(lead);
    }    

    async getLeads(query): Promise<Lead[]> {
        return this.leadRepo.find({ where: query });
    }

    async getLeadsWithCustomers(): Promise<Lead[]> {
        return this.leadRepo.find({ relations: ['customer'] });
    }
}
