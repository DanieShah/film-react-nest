import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Films } from './films.entity';

@Entity()
export class Schedules {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  daytime: string;

  @Column()
  hall: number;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column()
  taken: string;

  @Column()
  price: number;

  @Column({ type: 'uuid', name: 'filmId' })
  filmId: string;

  @ManyToOne(() => Films, (film) => film.schedule)
  film: Films;
}
