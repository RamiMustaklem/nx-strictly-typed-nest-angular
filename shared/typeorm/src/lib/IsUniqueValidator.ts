import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import {
  registerDecorator,
  ValidationArguments, ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

// decorator options interface
export type IsUniqueInterface = {
  tableName: string,
  column: string
}

// decorator function
export function IsUnique(options: IsUniqueInterface, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsUnique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [options],
      options: validationOptions,
      validator: IsUniqueConstraint,
    })
  }
}

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {

  constructor(private readonly entityManager: EntityManager) {}

  async validate(
    value: string,
    args: ValidationArguments
  ): Promise<boolean> {
    // catch options from decorator
    const { constraints } = args
    const { tableName, column }: IsUniqueInterface = constraints[0]

    // database query check data is exists
    const dataExist = await this.entityManager.getRepository(tableName)
      .createQueryBuilder(tableName)
      .where({[column]: value})
      .getExists()

    return !dataExist
  }

  defaultMessage(args: ValidationArguments): string {
    // return custom field message
    const field: string = args.property
    const value: string = args.value
    return `${field} with value: ${value} already exists`
  }
}
