import { HttpException, HttpStatus } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export class ValidationException extends HttpException {
  messages;

  constructor(response) {
    super(response, HttpStatus.BAD_REQUEST);
    this.messages = response;
  }
}

@ValidatorConstraint({ name: 'isBefore', async: false })
export class IsBeforeConstraint implements ValidatorConstraintInterface {
  validate(propertyValue: string, args: ValidationArguments) {
    return propertyValue < args.object[args.constraints[0]];
  }

  defaultMessage(args: ValidationArguments) {
    return `"${args.property}" must be before "${args.constraints[0]}"`;
  }
}
