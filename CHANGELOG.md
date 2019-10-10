# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.3.0](https://github.com/uamanager/arac/compare/v0.2.3...v0.3.0) (2019-10-10)


### ⚠ BREAKING CHANGES

* **accesscontrol:** Access Control dump now has more flat format. Now dump and map consist of object
per action permission instead of object per permission.

### Features

* **accesscontrol:** permissions map update ([0c7ef8a](https://github.com/uamanager/arac/commit/0c7ef8a5cd10db0f920d858824ccc43545b138f3))

### [0.2.3](https://github.com/uamanager/arac/compare/v0.2.2...v0.2.3) (2019-08-22)

### [0.2.2](https://github.com/uamanager/arac/compare/v0.2.1...v0.2.2) (2019-08-21)

### [0.2.1](https://github.com/uamanager/arac/compare/v0.2.0...v0.2.1) (2019-08-20)


### Bug Fixes

* **accesscontrol:** fix import default arguments ([cc55799](https://github.com/uamanager/arac/commit/cc55799))

## [0.2.0](https://github.com/uamanager/arac/compare/v0.1.0...v0.2.0) (2019-08-19)


### ⚠ BREAKING CHANGES

* **accesscontrol:** Dynamic checker function now should return Promise<boolean>
* **accesscontrol:** Permission method accepts boolean instead of patch as action is already passed to
method.

### Bug Fixes

* **accesscontrol:** import method fix ([15bd36b](https://github.com/uamanager/arac/commit/15bd36b))
* **accesscontrol:** permissions resolve/reject fix ([63944c2](https://github.com/uamanager/arac/commit/63944c2))

## 0.1.0 (2019-08-11)


### ⚠ BREAKING CHANGES

* **accesscontrol:** Import and Export methods API was changed

re VK-4

### Features

* **accesscontrol:** import/export update ([7db5550](https://github.com/uamanager/arac/commit/7db5550))
