import express, { Application } from 'express'
import { bootServer } from './Server'
import { initiateRoutes } from './routes'
import { dbInit } from './database/objection/conn'
import { initiateEventListeners } from "./events"
import { initiateWorkerPull, options } from "./multiThreading/workerpull"
import { initiateRabbitMqConsumers } from "./channels/rabbitmq";
import { emailWorker } from './jobs/EmailJob'
import { initiateEmailQueueScheduler } from './jobs/QueueSchedulers'

const app: Application = express()

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Connect Database
dbInit()
// Initiate Routes
initiateRoutes(app)
// Initiate EventListeners
initiateEventListeners()
// Initiate WorkerPulls
initiateWorkerPull(options)
// Initiate RabbitMq Consumers
// initiateRabbitMqConsumers()
// Initiate QueueScheduler
initiateEmailQueueScheduler()
// Boot NodeJs Server
bootServer(app)


