# 🔒 Type Vault

**Type Vault** is a TypeScript utility package that provides robust and validated types for common structured values like UUIDs, URLs, ISO date-times, hex colors, and more. It helps enforce correctness at runtime while maintaining strong typing at compile time.

## ✨ Features

- ✅ Runtime and compile time validation
- 🧪 Built-in test helpers for immutability and nullability

## 🧑‍💻 How to use

### 📥 Basic Usage

Create a validated `Email` instance and access or update its value:

```ts
import { Email } from '@martijnvdb87/type-vault';

const email = new Email('user@example.com');
console.log(email.value); // 'user@example.com'

// Update the value with another valid email
email.value = 'foo@bar.com';
console.log(email.value); // 'foo@bar.com'
```

### ❓ Nullable Variant

Use `.nullable()` or pass `{ nullable: true }` to allow `null` as a valid value:

```ts
import { Email } from '@martijnvdb87/type-vault';

const nullable = Email.nullable();
// Or:
const nullable = new Email(null, { nullable: true });

console.log(nullable.value); // null

// Set a valid email later
nullable.value = 'user@example.com';
console.log(nullable.value); // 'user@example.com'
```

### 🔒 Immutable Variant

Use `.immutable()` or pass `{ immutable: true }` to prevent value changes after initialization:

```ts
import { Email } from '@martijnvdb87/type-vault';

const immutable = Email.immutable('user@example.com');
// Or:
const immutable = new Email('user@example.com', { immutable: true });

console.log(immutable.value); // 'user@example.com'

// Attempting to change the value throws a TypeVaultValidationError
immutable.value = 'another@example.com'; // ❌ Throws error
```

### 📦 Collection

The `Collection` type lets you group validated Type Vault instances into a strongly typed, iterable array-like structure. It enforces type safety and exposes familiar array methods.

#### ✅ Basic Usage

```ts
import { Collection, Email } from '@martijnvdb87/type-vault';

const collection = new Collection(Email, [
    new Email('foo@example.com'),
    new Email('bar@example.com'),
    new Email('baz@example.com'),
]);

console.log(collection.type); // typeof Email
console.log(collection.length); // 3

console.log(collection.toArray().map((e) => e.value));
// ['foo@example.com', 'bar@example.com', 'baz@example.com']
```

#### 🧪 Supported Methods

Collection instances support most native array methods, plus a few extras:

Iteration & Search: `forEach`, `map`, `filter`, `find`, `findIndex`, `some`, `every`, `includes`, `indexOf`, `lastIndexOf`

Mutation: `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`

Inspection & Conversion: `length`, `toArray`, `toString`, `values`, `concat`, `reduce`

## 🧰 Supported Types

Type Vault offers a rich set of validated. Each type enforces strict formatting and value constraints at runtime, and all values are stored in a normalized form to ensure consistency and predictability across your application.

### 🎨 Color Types

For working with color values in various formats:

- `ColorHex` – Hexadecimal color code (e.g. `'#ffcc00ff'`, `'#ffcc00'` or `'#fc0'`)
- `ColorRgb` – RGB color object (e.g. `'rgb(255 128 0 / 100%)'`, `'rgb(255, 128, 0)'` or `'rgb(255 128 0 / 1)'`)
- `ColorHsl` – HSL color object (e.g. `'hsl(360 0 0 / 1)'` or `'hsl(360deg 0% 0% / 100%)'`)
- `ColorOklch` – OKLCH color object (e.g. `'oklch(70 0.4 120deg / 25%)'`, `'oklch(70% 100% 120deg / 0.25)'` or `'oklch(0.7 0.4 120 / 25%)'`)

### 🕒 Temporal Types

For representing and validating time-related values:

- `DateOnly` – ISO date string without time (e.g. `'2023-01-02'` or `'2023-1-2'`)
- `DateTime` – ISO UTC date-time string (e.g. `'2023-01-02T01:23:45.123Z'` or `'2023-01-02T01:23:45Z'`)
- `TimeOnly` – ISO time string without date (e.g. `'01:23:45.123'` or `'01:23:45'`)
- `Duration` – ISO 8601 duration string (e.g. `'PT1H30M'`)
- `Month` – Valid month name or number (e.g. `'january'` or `december`)
- `Weekday` – Valid weekday name (e.g. `'monday'`)
- `Year` – Valid four-digit year (e.g. `'2025'`)

### 🌐 Communication Types

For validating contact and identity formats:

- `Email` – RFC-compliant email address (e.g. `'user@example.com'`)
- `PhoneNumber` – E.164 formatted phone number (e.g. `'+31612345678'`)

### ✏️ Text & Numeric Types

For structured text, numbers, and identifiers:

- `Text` – A valid text string (e.g. `'foo'`, `'Lorem ipsum dolor sit amet'` or `''`)
- `Integer` – Whole number (e.g. `42`)
- `Float` – Decimal number (e.g. `3.14`)
- `Percentage` – Decimal number between 0 and 1 (e.g. `0`, `0.5` or `1`)
- `Url` – Valid absolute URL (e.g. `'https://example.com'`)
- `Uuid` – RFC 4122 UUID string (e.g. `'550e8400-e29b-41d4-a716-446655440000'`)
