# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2026-07-22

### Added

- Added dedicated `ImmutableValueError`, `InvalidPropertyError`, and `InvalidTypeError` validation exceptions.
- Added `Type.equals()`, `Type.assertEquals()`, and `Type.isValid()` methods.

### Changed

- Type values are now explicitly string serializable through `toString()`.
- Added per-type test coverage for string serialization and JSON serialization behavior.
- Added test coverage for `Type.equals()`, `Type.assertEquals()`, and `Type.isValid()`.
- Removed deprecated nullable behavior from type construction and validation.
- Reordered generic parameter signatures to a value-first convention across core and concrete types (including `Type`, `TypeValue`, base type classes, color types, and related collection constraints).
- Added TypeScript path alias configuration so `@/` imports resolve to `src/` in editor and type-checking workflows.

### Removed

- Removed the nullable option from type configuration.
- Types now consistently require non-null input values.

### Migration

- Remove any usage of the nullable option.
- Handle nullable values in application code before creating Type Vault type instances.
- Update custom type extensions and usages to the new value-first generic order where applicable.

## [1.0.0] - 2025-10-17

Added
Initial public release of Type Vault.
