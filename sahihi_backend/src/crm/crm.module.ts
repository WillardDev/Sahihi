import { CrmService } from './crm.service';
import { CrmController } from './crm.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './crm.entity';
import { Lead } from './lead.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Customer, Lead])],
    controllers: [CrmController,],
    providers: [CrmService,],
    exports: [CrmService],
})
export class CrmModule { }
