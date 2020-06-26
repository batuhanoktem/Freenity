import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from "../extensions"
import { User, UserModel } from "../user"
import { GetLoginResult, GetRegisterResult, GetUserResult } from "../../services/api"
import { GeneralApiProblem } from "../../services/api/api-problem"

/**
 * Model description here for TypeScript hints.
 */
export const LoginStoreModel = types
  .model("LoginStore")
  .props({
    accessToken: types.maybeNull(types.string),
    role: types.maybeNull(types.string),
    user: types.optional(UserModel, { login: "", password: "" }),
  })
  .extend(withEnvironment)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    saveAccessToken: (accessToken: string) => {
      self.accessToken = accessToken
    },
    saveRole: (role: string) => {
      self.role = role
    },
    saveUser: (user: User) => {
      self.user = user
    },
    logout: () => {
      self.accessToken = null
      self.role = null
      self.user = UserModel.create({ login: "", password: "" })
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    login: flow(function*(
      user: User,
      loginSuccess?: (result: number) => void,
      loginFail?: (result: GeneralApiProblem) => void,
    ) {
      const result: GetLoginResult = yield self.environment.api.login(user)

      if (result.kind === "ok") {
        self.saveUser(user)
        self.saveAccessToken(result.login.data)
        if (loginSuccess !== null) loginSuccess(2)
        /*
        const settingsResult: GetSettingsResult = yield self.environment.api.getSettings()
        console.tron.log(JSON.stringify(settingsResult))
        if (settingsResult.kind === "ok") {
          if (loginSuccess !== null) loginSuccess(settingsResult.settings)
        } else {
          __DEV__ && console.tron.log(result.kind)

          if (loginFail != null) loginFail(settingsResult)
        }
        */
      } else {
        __DEV__ && console.tron.log(result.kind)

        if (loginFail != null) loginFail(result)
      }
    }),
    register: flow(function*(
      user: User,
      registerSuccess?: (result: number) => void,
      registerFail?: (result: GeneralApiProblem) => void,
    ) {
      const result: GetRegisterResult = yield self.environment.api.register(user)

      if (result.kind === "ok") {
        self.saveUser(user)
        self.saveAccessToken(result.register.data)
        if (registerSuccess !== null) registerSuccess(2)
        /*
        const settingsResult: GetSettingsResult = yield self.environment.api.getSettings()
        if (settingsResult.kind === "ok") {
          if (registerSuccess !== null) registerSuccess(settingsResult.settings)
        } else {
          __DEV__ && console.tron.log(result.kind)

          if (registerFail != null) registerFail(settingsResult)
        }
        */
      } else {
        __DEV__ && console.tron.log(result.kind)

        if (registerFail != null) registerFail(result)
      }
    }),
    getRole: flow(function*(
      roleSuccess?: () => void,
      roleFail?: (result: GeneralApiProblem) => void,
    ) {
      self.environment.api.apisauce.setHeader("Authorization", `Bearer ${self.accessToken}`)
      const result: GetUserResult = yield self.environment.api.getUser()

      if (result.kind === "ok") {
        self.saveRole(result.role)
        if (roleSuccess != null) roleSuccess()
      } else {
        __DEV__ && console.tron.log(result.kind)

        if (roleFail != null) roleFail(result)
      }
    }),
  }))
/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type LoginStoreType = Instance<typeof LoginStoreModel>
export interface LoginStore extends LoginStoreType {}
type LoginStoreSnapshotType = SnapshotOut<typeof LoginStoreModel>
export interface LoginStoreSnapshot extends LoginStoreSnapshotType {}
