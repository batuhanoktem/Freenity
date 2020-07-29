import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { MessageModel, MessageSnapshot, Message } from "../message/message"
import { withEnvironment } from "../extensions"
import { GetMessagesResult, GetMessageRequestResult, GetUploadResult } from "../../services/api"
import { MessageRequest } from "../message-request"
import { DocumentPickerResponse } from "react-native-document-picker"
import { UploadResponseModel } from "../upload-response"
import { FileModel, File } from "../file"
import { ImagePickerResponse } from "react-native-image-picker"

/**
 * Model description here for TypeScript hints.
 */
export const MessageStoreModel = types
  .model("MessageStore")
  .props({
    refreshing: types.optional(types.boolean, false),
    offset: types.optional(types.number, 0),
    messages: types.optional(types.array(MessageModel), []),
    language: types.optional(types.string, "en"),
    scrolling: types.optional(types.boolean, false),
    favourites: types.optional(types.boolean, false),
    activeFiles: types.optional(types.array(FileModel), []),
    activeFile: types.optional(types.number, 0),
    url: types.maybeNull(types.string),
  })
  .extend(withEnvironment)
  .views(self => ({
    get reverseMessages() {
      return self.messages.slice().sort((a, b) => (a.created_at < b.created_at ? -1 : 1))
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    saveMessages: (messageSnapshots: MessageSnapshot[]) => {
      let newMessages: MessageSnapshot[] = messageSnapshots.filter(
        x => self.messages.filter(y => y.id === x.id).length === 0,
      )
      const messageModels: Message[] = newMessages.map(m => MessageModel.create(m))

      self.messages.replace(self.messages.concat(messageModels))
    },
    saveRefreshing: (refreshing: boolean) => {
      self.refreshing = refreshing
    },
    saveOffset: (offset: number) => {
      self.offset = offset
    },
    saveLanguage: (language: string) => {
      self.language = language
    },
    saveScrolling: (scrolling: boolean) => {
      self.scrolling = scrolling
    },
    saveFavourites: (favourites: boolean) => {
      self.favourites = favourites
    },
    clearMessages: () => {
      self.messages.clear()
    },
    saveActiveFiles: (files: File[]) => {
      self.activeFiles.replace(files.map(m => FileModel.create(m)))
    },
    saveActiveFile: (index: number) => {
      self.activeFile = index
    },
    saveUrl: (url: string) => {
      self.url = url
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    getMessages: flow(function*(
      offset: number = self.offset,
      language: string = self.language,
      accessToken: string,
      messagesSuccess?: () => any,
    ) {
      self.saveRefreshing(true)
      let result: GetMessagesResult

      self.environment.api.apisauce.setHeader("Authorization", `Bearer ${accessToken}`)
      if (!self.favourites) result = yield self.environment.api.getMessages(offset, language)
      else result = yield self.environment.api.getFavourites(offset)

      if (result.kind === "ok") {
        self.saveMessages(result.messages)
        if (messagesSuccess) messagesSuccess()
      } else {
        __DEV__ && console.tron.log(result.kind)
      }

      self.saveRefreshing(false)
    }),
    getFavourites: flow(function*(
      offset: number = self.offset,
      accessToken: string,
      messagesSuccess?: () => any,
    ) {
      self.saveRefreshing(true)

      const result: GetMessagesResult = yield self.environment.api.getFavourites(offset)

      if (result.kind === "ok") {
        self.saveMessages(result.messages)
        if (messagesSuccess) messagesSuccess()
      } else {
        __DEV__ && console.tron.log(result.kind)
      }

      self.saveRefreshing(false)
    }),
    sendMessage: flow(function*(message: MessageRequest, accessToken: string) {
      self.environment.api.apisauce.setHeader("Authorization", `Bearer ${accessToken}`)
      const result: GetMessageRequestResult = yield self.environment.api.sendMessage(message)

      if (result.kind === "ok") {
        return true
      } else {
        __DEV__ && console.tron.log(result.kind)

        return false
      }
    }),
    uploadFile: flow(function*(
      message: MessageRequest,
      file: ImagePickerResponse,
      accessToken: string,
    ) {
      self.environment.api.apisauce.setHeader("Authorization", `Bearer ${accessToken}`)
      const result: GetUploadResult = yield self.environment.api.uploadFile(file)

      if (result.kind === "ok") {
        const uploadResponse = UploadResponseModel.create(result.response)
        message.addFile(uploadResponse)
        return true
      } else {
        __DEV__ && console.tron.log(result.kind)

        return false
      }
    }),
    deleteMessage: flow(function*(id: string, accessToken: string) {
      self.environment.api.apisauce.setHeader("Authorization", `Bearer ${accessToken}`)
      const result: GetMessageRequestResult = yield self.environment.api.deleteMessage(id)

      if (result.kind === "ok") {
        let message = self.messages.filter(x => x.id === id)[0]
        if (message !== undefined && message !== null) self.messages.remove(message)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
    favouriteMessage: flow(function*(id: string, accessToken: string) {
      self.environment.api.apisauce.setHeader("Authorization", `Bearer ${accessToken}`)
      const result: GetMessageRequestResult = yield self.environment.api.favouriteMessage(id)

      if (result.kind === "ok") {
        if (self.favourites) {
          let message = self.messages.filter(x => x.id === id)[0]
          if (message !== undefined && message !== null) self.messages.remove(message)
        }
        return true
      } else {
        __DEV__ && console.tron.log(result.kind)
        return false
      }
    }),
  }))
/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type MessageStoreType = Instance<typeof MessageStoreModel>
export interface MessageStore extends MessageStoreType {}
type MessageStoreSnapshotType = SnapshotOut<typeof MessageStoreModel>
export interface MessageStoreSnapshot extends MessageStoreSnapshotType {}
