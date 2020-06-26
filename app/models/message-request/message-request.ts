import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions"
import { UploadResponseModel, UploadResponse } from "../upload-response"

/**
 * Model description here for TypeScript hints.
 */
export const MessageRequestModel = types
  .model("MessageRequest")
  .props({
    comment: types.maybeNull(types.string),
    files: types.optional(types.array(UploadResponseModel), [])
  })
  .extend(withEnvironment)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    setComment(comment: string) {
      self.comment = comment
    },
    addFile: (file: UploadResponse) => {
      self.files.push(file)
    },
    clearFiles: () => {
      self.files.clear()
    },
    removeFile: (file: UploadResponse) => {
      self.files.remove(file)
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type MessageRequestType = Instance<typeof MessageRequestModel>
export interface MessageRequest extends MessageRequestType {}
type MessageRequestSnapshotType = SnapshotOut<typeof MessageRequestModel>
export interface MessageRequestSnapshot extends MessageRequestSnapshotType {}
