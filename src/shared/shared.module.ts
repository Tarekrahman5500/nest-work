import { Module } from '@nestjs/common';
import { ValidationService } from '../error-handler/validationService';
import { UuidService } from '../common/constants/UuidService';

@Module({
  providers: [ValidationService, UuidService],
  exports: [ValidationService, UuidService],
})
export class SharedModule {}
