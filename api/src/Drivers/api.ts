import * as dotenv from 'dotenv'
import { applicationStart } from '../Adapter/Rest/server'
import { TypeORMMySQLDatabase } from './Database'

dotenv.config()
applicationStart(new TypeORMMySQLDatabase())
