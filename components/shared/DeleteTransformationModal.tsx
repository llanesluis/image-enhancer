"use client";

import { deleteImage } from "@/lib/actions/image.actions";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function DeleteTransformationModal({ imageId }: { imageId: string }) {
  const handleDelete = async () => {
    await deleteImage(imageId);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="min-w-60 border-accentcolor capitalize max-sm:w-full"
          variant={"destructive"}
        >
          Eliminar transformación
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar transformación</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de que quieres hacer esto? Perderás la transformación
            que has hecho.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} asChild>
            <Button variant={"destructive"}>Continuar</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
