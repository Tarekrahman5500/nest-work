import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

// Interface for Song data (optional, for flexibility)
export type Song = {
  title: string;
  artists: string[];
  releaseDate: Date;
  duration: Date;
};

// Zod schema for Song data
export const CreateSongSchema = z
  .object({
    title: z.string().trim().min(3, 'Title is required'),
    artists: z.array(z.string().trim()),
    releaseDate: z.date(),
    duration: z.date(),
  })
  .strip()
  .required();

// CreateSongDto class with validation and type safety
export class CreateSongDto extends createZodDto(CreateSongSchema) {}
