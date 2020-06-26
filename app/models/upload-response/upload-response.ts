import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const UploadResponseModel = types
  .model("UploadResponse")
  .props({
    type: types.maybeNull(types.string),
    name: types.maybeNull(types.string),
    preview: types.maybeNull(types.string),
    url: types.maybeNull(types.string)
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type UploadResponseType = Instance<typeof UploadResponseModel>
export interface UploadResponse extends UploadResponseType {}
type UploadResponseSnapshotType = SnapshotOut<typeof UploadResponseModel>
export interface UploadResponseSnapshot extends UploadResponseSnapshotType {}
