import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Schedules } from './schedules.entity';

@Entity()
export class Films {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'double precision' })
  rating: number;

  @Column({ type: 'character varying' })
  director: string;

  @Column({ type: 'text' })
  tags: string;

  @Column()
  image: string;

  @Column()
  cover: string;

  @Column()
  title: string;

  @Column({ type: 'varchar' })
  about: string;

  @OneToMany(() => Schedules, (schedule) => schedule.film)
  schedule: Schedules[];
}
