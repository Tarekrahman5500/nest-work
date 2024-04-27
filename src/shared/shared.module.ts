import { Module } from '@nestjs/common';
import { ValidationService } from '../error-handler/validationService';

@Module({
  providers: [ValidationService],
  exports: [ValidationService],
})
export class SharedModule {}
