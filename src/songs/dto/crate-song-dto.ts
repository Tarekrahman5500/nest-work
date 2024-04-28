import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

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
  const durationFormatRegex = /^\d{2}:\d{2}$/;
  return durationFormatRegex.test(durationString);
}

// Zod schema for Song data
export const CreateSongSchema = z
  .object({
    title: z.string().trim().min(3),
    artists: z.array(z.string().trim()),
    releaseDate: z
      .string()
      .refine(
        validateDateFormat,
        'Release date must be in the format yyyy-mm-dd',
      ),
    duration: z
      .string()
      .refine(validateDurationFormat, 'Duration must be in the format mm:ss'),
  })
  .strip()
  .required();

// CreateSongDto class with validation and type safety
export class CreateSongDto extends createZodDto(CreateSongSchema) {}
