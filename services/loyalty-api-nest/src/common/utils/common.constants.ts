import { ValidationPipeOptions } from '@nestjs/common';

export const VALIDATION_PIPE_OPTIONS: ValidationPipeOptions = {
  // Keep only properties that are decorated in the DTO;
  // unknown/extraneous properties are stripped from the payload
  whitelist: true,
  // If extraneous properties are present, throw a 400 error
  // instead of silently removing them
  forbidNonWhitelisted: true,
  // Auto-transform incoming payloads to the target DTO types
  // (and primitive types) using class-transformer
  transform: true,
  transformOptions: {
    // Allow implicit type conversion based on the DTO's
    // reflected property types (e.g., "42" -> 42, "true" -> true)
    enableImplicitConversion: true,
  },
};

export const DEFAULT_PAGE_SIZE = {
  MEMBER: 10,
} as const satisfies Record<string, number>;
