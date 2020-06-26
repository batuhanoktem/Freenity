import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const FileModel = types
  .model("File")
  .props({
    type: types.maybeNull(types.string),
    name: types.maybeNull(types.string),
    url: types.maybeNull(types.string),
    preview: types.maybeNull(types.string)
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type FileType = Instance<typeof FileModel>
export interface File extends FileType {}
type FileSnapshotType = SnapshotOut<typeof FileModel>
export interface FileSnapshot extends FileSnapshotType {}
