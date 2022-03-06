import React, { useState, forwardRef, useImperativeHandle, useCallback } from "react";
import { Heading } from "@chakra-ui/react";

const DynamicText = forwardRef<{ changeValue: (value: string) => void }>((props, ref) => {
  const [value, setValue] = useState("Random Text");

  const changeValue = useCallback(
    (newValue) => {
      setValue(newValue);
    },
    [setValue]
  );

  useImperativeHandle(ref, () => ({
    changeValue,
  }));

  return (
    <Heading maxW="50vw" maxH="300px" noOfLines={3}>
      {value}
    </Heading>
  );
});

export default DynamicText;
