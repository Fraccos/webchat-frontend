export type notifyColor =  "primary" | "secondary" | "success" | "error" | "info" | "warning"

export type NotifyMessage = {
    insertionDate: Date,
    content: string | React.ReactNode,
    type: notifyColor
}
export type notifyCallback = (n: NotifyMessage) => void



export default class NotificationService {
    static  notifyDispatcher: notifyCallback | undefined = undefined;
    static push(n: NotifyMessage) {
        if (NotificationService.notifyDispatcher !== undefined) {
            NotificationService.notifyDispatcher(n)
        }
    }

    static serveAsDispachter(fn: notifyCallback) {
        NotificationService.notifyDispatcher = fn; 
    } 
}


