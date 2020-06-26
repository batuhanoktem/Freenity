import { GeneralApiProblem } from "./api-problem"
import { LoginSnapshot } from "../../models/login"
import { MessageSnapshot } from "../../models/message"
import { UploadResponse } from "../../models/upload-response"

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; role: string } | GeneralApiProblem

export type GetLoginResult = { kind: "ok"; login: LoginSnapshot } | GeneralApiProblem
export type GetRegisterResult = { kind: "ok"; register: LoginSnapshot } | GeneralApiProblem
export type GetSettingsResult = { kind: "ok"; settings: number } | GeneralApiProblem

export type GetMessagesResult = { kind: "ok"; messages: MessageSnapshot[] } | GeneralApiProblem
export type GetMessageRequestResult = { kind: "ok";  } | GeneralApiProblem

export type GetUploadResult = { kind: "ok"; response: UploadResponse } | GeneralApiProblem