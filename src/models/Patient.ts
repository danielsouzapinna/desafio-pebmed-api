import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import Appointment from './Appointment';

@Entity('patients')
class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  dateBirth: Date;

  @Column()
  gender: string;

  @Column()
  height: string;

  @Column()
  weight: string;

  @Column()
  telephone: string;

  @OneToMany(type => Appointment, appointment => appointment.patient, { onDelete: 'CASCADE' })
  appointments: Appointment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Patient;
