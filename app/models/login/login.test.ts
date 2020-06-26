import { LoginModel, Login } from "./login"

test("can be created", () => {
  const instance: Login = LoginModel.create({})

  expect(instance).toBeTruthy()
})