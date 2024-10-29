import { Controller, Post, Body, Get, Query, Param, Put, Delete } from '@nestjs/common';
import { CrmService } from './crm.service';
import { Customer } from './crm.entity';
import { Lead } from './lead.entity';
import { Public } from 'src/auth/public-strategy';

@Controller('crm')
export class CrmController {
    constructor(private readonly crmService: CrmService) {}

    @Public()
    @Post('customer')
    createCustomer(@Body() customerData: Partial<Customer>) {
        return this.crmService.createCustomer(customerData);
    }

    @Public()
    @Put('customer/:id')
    updateCustomer(@Param('id') id: number, @Body() customerData: Partial<Customer>) {
        return this.crmService.updateCustomer(id, customerData);
    }

    @Public()
    @Get('customers/:id')
    async findOne(@Param('id') id: string): Promise<Customer> {
        return await this.crmService.findOneById(id);
    }

    @Public()
    @Get('customers')
    async getCustomers(@Query() query) {
        return this.crmService.getCustomers(query);
    }

    @Public()
    @Delete('customers/:id')
    async remove(@Param('id') id: string): Promise<void> {
        return await this.crmService.remove(id);
    }

    @Public()
    @Post('lead')
    addLead(@Body() leadData: Partial<Lead>) {
        return this.crmService.addLead(leadData);
    }

    @Public()
    @Get('leads')
    getLeads(@Query() query) {
        return this.crmService.getLeads(query);
    }

    @Public()
    @Get('customer-leads')
    async getCustomerLeads(): Promise<Lead[]> {
        return this.crmService.getLeadsWithCustomers();
    }

}
