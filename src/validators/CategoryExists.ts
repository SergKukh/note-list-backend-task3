import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import mockData from "src/data/mockData";

@ValidatorConstraint({ name: 'CategoryExists', async: true })
export class CategoryExists implements ValidatorConstraintInterface {
    async validate(value: string): Promise<boolean> {
        const category = mockData.categories.find(c => c.name === value);
        if (!category) {
            return false;
        }
        return true;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return `category doesn't exist`;
    }
}