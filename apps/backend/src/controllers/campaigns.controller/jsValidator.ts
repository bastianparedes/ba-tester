import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { jsCodeHasCorrectSyntax } from '../../../../domain/jsCode';

/**
 * Custom validator to check if a string contains valid JavaScript code
 */
@ValidatorConstraint({ name: 'JsCodeSyntax', async: false })
export class JsCodeSyntaxConstraint implements ValidatorConstraintInterface {
  validate(value: unknown): boolean {
    // Allow empty values (use @IsNotEmpty if required)
    if (value == null) return true;

    if (typeof value !== 'string') return false;

    return jsCodeHasCorrectSyntax(value);
  }

  defaultMessage(args: ValidationArguments): string {
    return args.constraints?.[0] ?? `${args.property} does not contain valid JavaScript code`;
  }
}

/**
 * Decorator to validate JavaScript code syntax
 */
export function IsJsCode(validationOptions?: ValidationOptions) {
  // biome-ignore lint/complexity/noBannedTypes: <Not necesary>
  return (object: { constructor: Function }, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: JsCodeSyntaxConstraint,
    });
  };
}
