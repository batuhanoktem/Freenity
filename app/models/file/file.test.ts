import { FileModel, File } from "./file"

test("can be created", () => {
  const instance: File = FileModel.create({})

  expect(instance).toBeTruthy()
})