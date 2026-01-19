import { Column, DeleteDateColumn } from 'typeorm';

export class SoftDelete {
  @Column({ name: 'is_deleted', type: 'boolean', default: false })
  isDeleted: boolean;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;
}
