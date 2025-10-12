# 🔒 Type Vault

**Type Vault** is a TypeScript utility package that provides robust and validated types for common structured values like UUIDs, URLs, ISO date-times, hex colors, and more. It helps enforce correctness at runtime while maintaining strong typing at compile time.

## ✨ Features

- ✅ Runtime and compile time validation
- 🧪 Built-in test helpers for immutability and nullability

## 🧑‍💻 How to use

### 📥 Basic Usage

Create a validated `Email` instance and access or update its value:

```typescript
const email = new Email('user@example.com');
console.log(email.value); // 'user@example.com'

// Update the value with another valid email
email.value = 'foo@bar.com';
console.log(email.value); // 'foo@bar.com'
```

### ❓ Nullable Variant

Use `.nullable()` or pass `{ nullable: true }` to allow `null` as a valid value:

```typescript
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

```typescript
const immutable = Email.immutable('user@example.com');
// Or:
const immutable = new Email('user@example.com', { immutable: true });

console.log(immutable.value); // 'user@example.com'

// Attempting to change the value throws a TypeVaultValidationError
immutable.value = 'another@example.com'; // ❌ Throws error
```

## Supported types

### 🎨 Colors

- `ColorHex`
- `ColorHsl`
- `ColorOklch`
- `ColorRgb`

### 🕒 Temporal

- `DateOnly`
- `DateTime`
- `Duration`
- `Month`
- `TimeOnly`
- `Weekday`
- `Year`

### 🌐 Communication

- `Email`
- `PhoneNumber`

### ✏️ Text & Numeric

- `Float`
- `Integer`
- `Percentage`
- `Text`
- `Url`
- `Uuid`

### 🛠️ Utility

- `Collection`
