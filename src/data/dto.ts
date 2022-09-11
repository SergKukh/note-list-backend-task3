import { IsNotEmpty, IsNumberString, IsString, Validate } from "class-validator";
import { CategoryExists } from "src/validators/CategoryExists";
import { NoteExists } from "src/validators/NoteExists";

export class CreateNoteDto {
    @IsString({ message: 'should be a string' })
    @IsNotEmpty({ message: 'empty' })
    readonly content: string;
    @IsString({ message: 'should be a string' })
    @IsNotEmpty({ message: 'empty' })
    @Validate(CategoryExists)
    readonly categoryName: string;
}

export class FindOneParams {
    @IsNumberString()
    @Validate(NoteExists)
    id: number;
}