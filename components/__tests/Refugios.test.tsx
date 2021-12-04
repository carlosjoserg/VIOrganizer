import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import Refugios from "../Refugios";

test("show story on screen", () => {
  const navigation = {
    navigate: jest.fn(),
    setOptions: jest.fn(),
  };

  const { toJSON, queryByTestId, getByTestId, queryByText } = render(<Refugios navigation={navigation} />);

  expect(Refugios()).toMatchSnapshot();
});
