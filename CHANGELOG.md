# [2.0.0-next.1](https://github.com/ntix/parsing/compare/v1.0.2...v2.0.0-next.1) (2023-02-24)


### Bug Fixes

* **nullable:** add nullable and allow undefined, other failure results normalise to null ([32cf597](https://github.com/ntix/parsing/commit/32cf59765e886348ed6177f9fa01eb54b230784b))
* **parsing:** It.If => If ([00353ad](https://github.com/ntix/parsing/commit/00353ad944406fac48391914d92711cbf52330b1))
* **parsing:** type (private var) ([324115c](https://github.com/ntix/parsing/commit/324115c020c5d6c88b7e7592540fb33365fc5588))
* **parsing:** type ParseErrors ([2eb88a1](https://github.com/ntix/parsing/commit/2eb88a137c9ffad31a3835aac2df0230692b7644))


### Code Refactoring

* **parsing:** change 'for' and 'complex' to 'object' ([ef47536](https://github.com/ntix/parsing/commit/ef475361c8601fd7a982b826945ed98f8bcef67b))
* **parsing:** move util functions to avoid circular refs ([51ceda3](https://github.com/ntix/parsing/commit/51ceda3a2a3915b7081b495287503461e791399d))


### Features

* **defined:** check for value not being undefined, allowing null or empty string ([ec08f9d](https://github.com/ntix/parsing/commit/ec08f9d65e39f829711ebc5916981998a1dc8e86))
* **parsing:** hasParseErrors helper mehod to check for parse errors ([fb816af](https://github.com/ntix/parsing/commit/fb816af21c35bbbdc96557b19c691eeeaefcb3ad))
* **parsing:** if conditional parse ([4c9ecbb](https://github.com/ntix/parsing/commit/4c9ecbb89b1ce46e63637f8a836ec26ff09949fc))
* **parsing:** ParseErrorCallback for bespoke errors on 'use' parser ([f4f82c3](https://github.com/ntix/parsing/commit/f4f82c3648b6cc99906ad9479f36c37d2c4fc70c))


### BREAKING CHANGES

* **parsing:** complex api change
* **parsing:** ensureDateArray => parseDateArray
* **parsing:** anyOf => oneOf

## [1.0.2](https://github.com/ntix/parsing/compare/v1.0.1...v1.0.2) (2022-11-12)


### Bug Fixes

* **build:** sync package lock ([bf9e638](https://github.com/ntix/parsing/commit/bf9e63882f1dff579437b368274a71bfcec908ab))
* **dates:** when browser parse/format is different for day/month position ([97a413d](https://github.com/ntix/parsing/commit/97a413d8f111281a61492b246fdbcafa0b1a5dec))

## [1.0.1](https://github.com/ntix/parsing/compare/v1.0.0...v1.0.1) (2022-10-22)


### Bug Fixes

* **parsing:** NextBuilder add/remove methods ([d1d1657](https://github.com/ntix/parsing/commit/d1d16577c1b17f5444920804ddcaa5c46e902e35))

# 1.0.0 (2022-10-05)


### Bug Fixes

* **parse:** correct min/max chaining ([4978597](https://github.com/ntix/parsing/commit/4978597f4747c1b087130f1b505a203c435fd005))
* **parsing:** strings ignore case ([#6](https://github.com/ntix/parsing/issues/6)) ([87c82a7](https://github.com/ntix/parsing/commit/87c82a74a99d3ebb2cb81a4105189bcb3629ebcd))


### Features

* **dates:** wip ([194fb35](https://github.com/ntix/parsing/commit/194fb35cac808fe7b87811c54036fae19a496387))
* **numbers:** basic framework with number parsing and validation ([d7695fd](https://github.com/ntix/parsing/commit/d7695fd01ce408f934307932838fa67ab4416eba))
* **parse:** anyOf array/enum ([a47cffa](https://github.com/ntix/parsing/commit/a47cffa123d9c02945f4ed876c77e6f80ccbd413))
* **parsing:** allow modular use of parsers ([94bd433](https://github.com/ntix/parsing/commit/94bd4336d942a716cc482333f3c864699fb75958))
* **parsing:** arrays basic support ([da96719](https://github.com/ntix/parsing/commit/da96719f8b4fc15431c11b730d19f5d65e8503f5))
* **parsing:** booleans ([dc536a3](https://github.com/ntix/parsing/commit/dc536a3ec9cdc06d2402efa5fd7619ce3619d84d))
* **parsing:** not validation ([c477d2b](https://github.com/ntix/parsing/commit/c477d2b91a2f3124c91d0036326e28868b2f02ce))
* **parsing:** object parsing ([adc6f84](https://github.com/ntix/parsing/commit/adc6f84768aec89ff9f6d2a6775d2876ca5a55a0))
