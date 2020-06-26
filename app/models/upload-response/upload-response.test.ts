import { UploadResponseModel, UploadResponse } from "./upload-response"

test("can be created", () => {
  const instance: UploadResponse = UploadResponseModel.create({})

  expect(instance).toBeTruthy()
})