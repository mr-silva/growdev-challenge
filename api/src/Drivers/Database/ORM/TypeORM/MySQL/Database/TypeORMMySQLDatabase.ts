import * as path from 'path'
import { DataSource } from 'typeorm'
import { IDatabaseConnectionInterface } from '../../../../../../Adapter'

export class TypeORMMySQLDatabase implements IDatabaseConnectionInterface {
  private static connection: DataSource
  private readonly host: string
  private readonly username: string
  private readonly password: string
  private readonly database: string
  private readonly port: number

  constructor() {
    this.host = process.env.MYSQL_HOST
    this.username = process.env.MYSQL_USERNAME
    this.password = process.env.MYSQL_PASSWORD
    this.database = process.env.MYSQL_DATABASE
    this.port = Number(process.env.MYSQL_PORT)
  }

  public async createConnection(): Promise<void> {
    if (TypeORMMySQLDatabase.connection && TypeORMMySQLDatabase.connection.isInitialized) return

    TypeORMMySQLDatabase.connection = new DataSource({
      name: 'mysql',
      type: 'mysql',
      host: this.host,
      port: this.port || 3306,
      username: this.username,
      password: this.password,
      database: this.database,
      entities: [
        path.join(__dirname, '..', 'Entity', '*.ts'),
        path.join(__dirname, '..', 'Entity', '*.js')
      ],
      logging: true,
      extra: {
        decimalNumbers: true
      }
    })

    TypeORMMySQLDatabase.connection.initialize()
  }

  public static getConnection(): DataSource {
    return TypeORMMySQLDatabase.connection
  }

  public async validate() {
    await this.createConnection()
    console.log('TypeORM MySQL database is working.')
  }
}
