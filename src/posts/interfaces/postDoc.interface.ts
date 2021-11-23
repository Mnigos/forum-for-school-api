import { Document } from 'mongoose'

import { Post } from './post.interface'

export type PostDoc = Omit<Post, '_id'> & Document
