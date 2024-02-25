import { User } from '../../src/Domain'

export const USER_ID = '44b72230-d4f5-4027-bfe1-7c776cdcb391'
export const USER_NAME = 'Jon Doe'
export const USER_DOCUMENT_NUMBER = '03935497202'
export const USER_EMAIL = 'jondoe@email.com'

export const EXISTENT_USER = new User(USER_NAME, USER_DOCUMENT_NUMBER, USER_EMAIL, USER_ID)
