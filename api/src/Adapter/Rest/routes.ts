import { Router } from 'express'
import { StudentController } from './Controller/StudentController'

const router = Router()

const studentController = new StudentController()

router
  .route('/student')
  .post(studentController.create.bind(studentController))
  .get(studentController.list.bind(studentController))

router
  .route('/student/:id')
  .patch(studentController.update.bind(studentController))
  .delete(studentController.delete.bind(studentController))

export { router }
