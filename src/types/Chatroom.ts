import { Document } from "mongoose"
import { User } from "./User"

export interface MessageContent {
    type: string,
    value: string
}

export interface Message {
    sender: User["_id"],
    created: Date,
    lastModified: Date,
    readed?: Date,
    edited: boolean,
    content: MessageContent[]
}

export interface Chatroom {
    _id: string
    name?: string,
    type?: string,
    owners?:  [User["_id"]],
    members?: [User["_id"]],
    messages: Message[]
}
 