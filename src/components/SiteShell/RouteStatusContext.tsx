"use client";

import { createContext } from "react";

// A route-level not-found boundary can report its status to the persistent shell.
export const RouteStatusContext = createContext<((pathname: string | null) => void) | null>(null);
