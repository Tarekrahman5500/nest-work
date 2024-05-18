import { baseSongSchema, ICreateSongDto } from './crate-song-dto';
import { createZodDto } from 'nestjs-zod';

// Zod schema for updating a song with a console log
export const UpdateSongSchema = baseSongSchema.partial().refine(
  (data) => {
    console.log(data); // Log the data being validated
    return Object.keys(data).length > 0;
  },
  {
    message: 'At least one field must be provided',
    path: ['body'], // This applies the validation to the entire object
  },
);

export type IUpdateSongDto = Partial<ICreateSongDto>;
export class UpdateSongDto extends createZodDto(UpdateSongSchema) {}
