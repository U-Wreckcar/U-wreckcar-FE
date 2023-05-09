"use client"; // this directive should be at top of the file, before any imports.
import React from "react";
// This is a Client Component
import { Provider } from "react-redux";
import store from "@/src/redux/store/store";
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
}
