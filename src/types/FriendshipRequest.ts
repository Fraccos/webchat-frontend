import { User } from "./User";

export interface FriendshipRequest {
    sender: User,
    receiver: User,
    timestamp: Date,
    rejected: Boolean,
    message: String,
    _id: string,
}