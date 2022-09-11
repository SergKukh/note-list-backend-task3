import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import mockData from "src/data/mockData";

@ValidatorConstraint({ name: 'noteExists', async: true })
export class NoteExists implements ValidatorConstraintInterface {
    async validate(value: string): Promise<boolean> {
        const note = mockData.notes.find(note => note.id === +value);
        if (!note) {
            return false;
        }
        return true;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return `note doesn't exist`;
    }
}