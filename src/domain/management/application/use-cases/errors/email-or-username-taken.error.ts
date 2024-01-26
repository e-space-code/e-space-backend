export class EmailOrUsernameTakenError extends Error {
  constructor(message?: string) {
    super(message ?? 'Email or Username already taken! Please, try again.')
  }
}
