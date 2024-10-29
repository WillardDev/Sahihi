import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ nullable: true })
    deadline: Date;

    @Column({ nullable: true })
    projectManagerId: number;

    @OneToMany(() => User, user => user.projects, { cascade: true })
    users: User[];
}
