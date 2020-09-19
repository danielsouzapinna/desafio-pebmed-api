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
  height: number;

  @Column()
  weight: number;

  @Column()
  telephone: string;

  @OneToMany(type => Appointment, appointment => appointment.patient)
  appointments: Appointment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Patient;
