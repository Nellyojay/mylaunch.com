export type TextInputGuardOptions = {
  maxLength?: number;
  allowNewlines?: boolean;
  collapseWhitespace?: boolean;
};

const DEFAULT_MAX_LENGTH = 500;

export const textInputGuardPresets = {
  shortText: {
    maxLength: 240,
  } satisfies TextInputGuardOptions,
  longText: {
    maxLength: 500,
  } satisfies TextInputGuardOptions,
  emailOrUsername: {
    maxLength: 120,
    allowNewlines: false,
    collapseWhitespace: true,
  } satisfies TextInputGuardOptions,
  password: {
    maxLength: 120,
    allowNewlines: false,
  } satisfies TextInputGuardOptions,
  name: {
    maxLength: 60,
    allowNewlines: false,
    collapseWhitespace: true,
  } satisfies TextInputGuardOptions,
  address: {
    maxLength: 140,
    allowNewlines: false,
    collapseWhitespace: true,
  } satisfies TextInputGuardOptions,
} as const;

// Client-side guard only. Always validate and sanitize again on the backend.
export const guardTextInputChange = (
  rawValue: string | null | undefined | number,
  options: TextInputGuardOptions = {}
) => {
  const {
    maxLength = DEFAULT_MAX_LENGTH,
    allowNewlines = true,
    collapseWhitespace = false,
  } = options;

  let value = String(rawValue ?? '');

  // Normalize unicode to reduce homoglyph/trick variations.
  value = value.normalize('NFKC');

  // Remove null bytes.
  value = value.replace(/\0/g, '');

  // Remove bidi control chars and zero-width/invisible chars often used for obfuscation.
  value = value.replace(/[\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g, '');

  // Remove ASCII control chars except tab/newline/carriage return.
  value = value.replace(/[\x01-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  if (!allowNewlines) {
    value = value.replace(/[\r\n]+/g, ' ');
  }

  if (collapseWhitespace) {
    value = value.replace(/\s+/g, ' ').trim();
  }

  // Block obvious script/protocol payload tokens in plain text fields.
  value = value
    .replace(/<\s*\/??\s*script\b/gi, '')
    .replace(/javascript\s*:/gi, '')
    .replace(/\bon\w+\s*=/gi, '');

  if (value.length > maxLength) {
    value = value.slice(0, maxLength);
  }

  return value;
};

