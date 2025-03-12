"use client";

import type * as React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps): React.JSX.Element {
  return <div {...props} />;
}
