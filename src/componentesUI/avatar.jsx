"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar"; // Importa Radix Primitive

// IMPORTANTE: Ruta de utilidad corregida para coincidir con el resto del proyecto
import { cn } from "@/lib/utils";

// El componente principal del Avatar
const Avatar = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        // Clases de Tailwind
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
});
Avatar.displayName = "Avatar";

// El componente para la imagen del Avatar
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
});
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

// El componente para el texto/iniciales de respaldo si la imagen falla
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        // Clases de Tailwind para el fallback
        "bg-muted flex size-full items-center justify-center rounded-full",
        className,
      )}
      {...props}
    />
  );
});
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };