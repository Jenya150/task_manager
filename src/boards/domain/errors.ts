export class BoardNotFoundError extends Error {}

export class UserAlreadyAddedError extends Error {}
export class UsersLimitReachedError extends Error {}
export class OwnerAlreadyExistsError extends Error {}

export class OwnerCannotBeRemovedError extends Error {}

export class UserNotFoundError extends Error {}

export class TitleIsRequiredError extends Error {}
export class TitleIsInvalidError extends Error {}

export class OwnerUserUUIDIsRequiredError extends Error {}
export class OwnerUserUUIDIsInvalidError extends Error {}

export class DescriptionIsInvalidError extends Error {}

export class RoleIsInvalidError extends Error {}
