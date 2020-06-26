import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { FullScreenVideo } from "./full-screen-video"

declare var module

storiesOf("FullScreenVideo", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <FullScreenVideo text="FullScreenVideo" />
      </UseCase>
    </Story>
  ))
