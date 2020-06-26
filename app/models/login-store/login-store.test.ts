import { LoginStoreModel, LoginStore } from "./login-store"

test("can be created", () => {
  const instance: LoginStore = LoginStoreModel.create({})

  expect(instance).toBeTruthy()
})