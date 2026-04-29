import * as React from "react";
import { createRoot } from "react-dom/client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

/**
 * Compatibility surface for the existing screen factory pattern.
 *
 * The screens still expect an injected `jsxRuntime` object plus the React
 * namespace. This wrapper keeps that contract while switching to standard
 * React packages underneath.
 */
const jsxRuntime = {
  Fragment,
  jsx,
  jsxs
};

export { React, createRoot, jsxRuntime };
