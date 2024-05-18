import { ICreateSongDto } from './crate-song-dto';

export function isCreateSongDto(
  dto: Partial<ICreateSongDto>,
): dto is ICreateSongDto {
  return (
    dto.title !== undefined &&
    dto.artists !== undefined &&
    dto.releasedDate !== undefined &&
    dto.duration !== undefined &&
    dto.lyrics !== undefined
  );
}
