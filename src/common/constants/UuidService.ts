// src/common/services/uuid.service.ts
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UUID } from './types/uuid';

@Injectable()
export class UuidService {
  generateUuid(): UUID {
    console.log(uuidv4());
    return uuidv4();
  }
}
