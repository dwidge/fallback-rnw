// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { Button, Text } from "@rneui/themed";
import React, { useState } from "react";
import { View } from "react-native";

export const ErrorFallback = ({
  error = new Error(),
  resetError = undefined as undefined | (() => void),
  userMessage = "Something went wrong...",
}) => (
  <View style={{ gap: 10, padding: 10 }}>
    <Text>{userMessage}</Text>
    <RenderErrorDetails error={error} />
    {resetError && <Button title="Try again" onPress={resetError} />}
  </View>
);

const RenderErrorDetails = ({
  error = new Error(),
  contextExpanded: [contextExpanded, setContextExpanded] = useState(false),
  errorExpanded: [errorExpanded, setErrorExpanded] = useState(false),
  cause = error.cause as { context?: any; error?: any } | undefined,
}) => (
  <View
    style={{ gap: 10, padding: 10, backgroundColor: "#9993", borderRadius: 10 }}
  >
    <Text>{error.toString()}</Text>
    {cause?.context && (
      <>
        <Button
          title={"Context"}
          onPress={() => setContextExpanded(!contextExpanded)}
        />
        {contextExpanded && (
          <Text>{JSON.stringify(cause.context, null, 2)}</Text>
        )}
      </>
    )}
    {cause?.error && (
      <>
        <Button
          title={"Error"}
          onPress={() => setErrorExpanded(!errorExpanded)}
        />
        {errorExpanded && <RenderErrorDetails error={cause.error} />}
      </>
    )}
  </View>
);
