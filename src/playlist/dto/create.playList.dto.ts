import { UUID } from '../../common/constants/types/uuid';
import { z } from 'nestjs-zod/z';
import { UUIDSchema } from '../../songs/dto/crate-song-dto';
import { createZodDto } from 'nestjs-zod';

export interface ICreatePlayList {
  name: string;
  songs: UUID[];
  readonly user: UUID;
}

export const CreatePlayListSchema = z.object({
  name: z.string().min(1),
  songs: z.array(UUIDSchema),
  user: UUIDSchema,
});

export class CreatePlayListDto extends createZodDto(CreatePlayListSchema) {}
