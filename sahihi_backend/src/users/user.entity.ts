import { Role } from 'src/auth/enum/role.enum';
import { Project } from 'src/projects/project.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true})
    phoneNumber: string;

    @Column({ nullable: true})
    address: string;

    @Column({ nullable: true })
    kraPin: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: 'Engineer'
    })
    role: string;

    @Column()
    createdAt: Date;

    @ManyToOne(() => Project, project => project.projectManagerId)
    projects: Project;
}
