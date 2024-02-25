import { Factory } from '../../Factory/Factory'
import { IDatabaseConnectionInterface } from '../Database/Interface/IDatabaseConnectionInterface'
import httpServer from './app'

function applicationStart(database: IDatabaseConnectionInterface) {
  httpServer.listen(httpServer.get('port'), async () => {
    console.info(
      `App is running at http://localhost:%d in ${
        process.env.ENVIRONMENT === 'prod' ? 'PRODUCTION' : 'DEVELOPMENT'
      } mode`,
      httpServer.get('port')
    )

    try {
      await database.validate()

      Factory.getInstance()
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  })
}

export { applicationStart }
