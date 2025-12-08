import * as React from "react";

// Importación corregida a la ruta global estándar
import { cn } from "@/lib/utils";

// Componente principal de la tarjeta
const Card = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="card"
      className={cn(
        // Clases de diseño de Tailwind (NO MODIFICADAS)
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border",
        className,
      )}
      {...props}
    />
  );
});
Card.displayName = "Card";

// Cabecera de la tarjeta
const CardHeader = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn(
        // Clases de diseño de Tailwind (NO MODIFICADAS)
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
});
CardHeader.displayName = "CardHeader";

// Título de la tarjeta
const CardTitle = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <h4
      ref={ref}
      data-slot="card-title"
      className={cn("leading-none", className)} // Clases NO MODIFICADAS
      {...props}
    />
  );
});
CardTitle.displayName = "CardTitle";

// Descripción de la tarjeta
const CardDescription = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      data-slot="card-description"
      className={cn("text-muted-foreground", className)} // Clases NO MODIFICADAS
      {...props}
    />
  );
});
CardDescription.displayName = "CardDescription";

// Acción dentro de la cabecera (CardAction)
const CardAction = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="card-action"
      className={cn(
        // Clases de diseño de Tailwind (NO MODIFICADAS)
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
});
CardAction.displayName = "CardAction";

// Contenido principal de la tarjeta
const CardContent = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="card-content"
      className={cn("px-6 .[&:last-child]:pb-6", className)} // Clases NO MODIFICADAS
      {...props}
    />
  );
});
CardContent.displayName = "CardContent";

// Pie de página de la tarjeta
const CardFooter = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn("flex items-center px-6 pb-6 [.border-t]:pt-6", className)} // Clases NO MODIFICADAS
      {...props}
    />
  );
});
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};