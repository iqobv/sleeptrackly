# Server changelog

## [1.5.0] - 2026-04-05

### Added

- Added user privacy settings model and endpoints.
- Added promotion system with models and endpoints.

### Fixed

- Fixed bug when session doesn't terminate from other device.
- Fixed bug with save in session.

## [1.4.1] - 2026-03-26

### Added

- Added Sentry for logging

### Fixed

- Added timeouts for prisma transactions for bundles and items

## [1.4.0] - 2026-02-21

### Added

- Updated dependencies, removed vulnerable ones
- Added rate limit for api endpoints
- Added rolling to sessions (refreshing expiration on each request)
- Added previewUrl field to item model

## [1.3.1] - 2026-02-16

### Fixed

- Fixed bug which don't send notifications to users
- Fixed bug when user receive two same notifications

## [1.3.0] - 2026-02-14 - "Coins and Customization"

### Added

- API endpoints for managing customization items
- API endpoints for managing coins
- User inventory system for customization items

## [1.2.0] - 2025-12-15 - "Notification system"

### Added

- Notification system
- Push notifications using firebase
- User preferences for notifications

### Fixed

- Fixed vulnerability in tokens system

## [1.1.0] - 2025-11-10 - "Report system"

### Added

- Report system
- User sanctions system

### Changed

- Added generation username when registering with google account
