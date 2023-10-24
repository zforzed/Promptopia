// import mongoose, { Schema, model, models } from 'mongoose'

// const PromptSchema = new Schema({
//   creator: {
//     type: Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   prompt: {
//     type: String,
//     required: [true, 'Prompt is required.']
//   },
//   tag: {
//     type: String,
//     required: [true, 'Tag is required.']
//   }
// })

// export const Prompt = models.Prompt || model('Prompt', PromptSchema)

import { Schema } from 'redis-om'

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  prompt: {
    type: 'string',
    required: [true, 'Prompt is required.']
  },
  tag: {
    type: 'string',
    required: [true, 'Tag is required.']
  }
})

export const Prompt = new PromptSchema()


