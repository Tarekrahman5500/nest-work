import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IBase } from './types/base';

export abstract class Base extends BaseEntity implements IBase {
  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => `CURRENT_TIMESTAMP AT TIME ZONE '+6'`,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone', // Specify the data type with time zone
    nullable: true, // Make the column nullable
    onUpdate: `CURRENT_TIMESTAMP AT TIME ZONE '+6'`, // Set the onUpdate value with the desired time zone offset
  })
  updatedAt: Date | null;
}
