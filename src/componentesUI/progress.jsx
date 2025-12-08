"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

// Importación corregida a la ruta global estándar
import { cn } from "@/lib/utils";

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    data-slot="progress"
    className={cn(
      // Clases de diseño de Tailwind (NO MODIFICADAS)
      "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      // Clases de diseño de Tailwind (NO MODIFICADAS)
      className="bg-primary h-full w-full flex-1 transition-all"
      // Lógica de transformación para mostrar el progreso (NO MODIFICADA)
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };