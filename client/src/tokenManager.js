export class TokenManager {
  #_token
  constructor() {
    this.#_token = null
  }

  get token() {
    return this.#_token
  }

  set token(value) {
    this.#_token = value
  }
}
