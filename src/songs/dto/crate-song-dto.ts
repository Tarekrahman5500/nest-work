import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { IArtist } from '../../artist/artist.entity';
import { UUID } from '../../common/constants/types/uuid';

// Interface for Song data (optional, for flexibility)
export type Song = {
  title: string;
  artists: string[];
  releaseDate: Date;
  duration: Date;
};

function validateDateFormat(dateString: string) {
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateFormatRegex.test(dateString);
}

function validateDurationFormat(durationString: string) {
  // Check if the string is not empty and matches the format mm:ss
  const durationFormatRegex = /^\d{2}:\d{2}$/;
  return durationString !== '' && durationFormatRegex.test(durationString);
}

export interface ICreateSongDto {
  title: string;
  artists: UUID[];
  releasedDate: Date;
  duration: Date;
  lyrics: string | null;
}

export const baseSongSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, { message: 'Title must be at least 3 characters long' }),
    artists: z.array(
      z.string().uuid({
        message: 'Invalid UUID format',
      }),
      { message: 'Artists must be an array of strings' },
    ),
    releasedDate: z
      .string()
      .refine(
        validateDateFormat,
        'Release date must be in the format yyyy-mm-dd',
      ),
    duration: z
      .string()
      .refine(validateDurationFormat, 'Duration must be in the format mm:ss'),
    lyrics: z
      .string()
      .min(3, { message: 'Lyrics must be at least 3 characters long' })
      .nullable(),
  })
  .strip();

// Zod schema for Song data
export const CreateSongSchema = baseSongSchema.required();

// CreateSongDto class with validation and type safety
export class CreateSongDto extends createZodDto(CreateSongSchema) {}

export const UUIDSchema = z.string().uuid();
