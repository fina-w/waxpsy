import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Rating } from "../ui/Rating";
import { useToast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";
import { createAvis } from "../../services/avisService";

const avisSchema = z.object({
  note: z
    .number()
    .min(1, "Veuillez donner une note")
    .max(5, "La note maximale est 5"),
  commentaire: z
    .string()
    .max(1000, "Le commentaire ne peut pas dépasser 1000 caractères")
    .optional(),
  professionnelId: z.string().min(1, "ID du professionnel requis"),
  utilisateurId: z.string().min(1, "ID de l'utilisateur requis"),
});

type AvisFormData = z.infer<typeof avisSchema>;

interface AvisFormProps {
  professionnelId: string;
  utilisateurId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const AvisForm = ({
  professionnelId,
  utilisateurId,
  onSuccess,
  onCancel,
}: AvisFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AvisFormData>({
    resolver: zodResolver(avisSchema),
    defaultValues: {
      note: 0,
      commentaire: "",
      professionnelId,
      utilisateurId,
    },
  });

  const note = watch("note");

  const onSubmit = async (data: AvisFormData) => {
    try {
      setIsSubmitting(true);
      await createAvis(data);

      toast({
        title: "Merci pour votre avis !",
        description: "Votre avis a été enregistré avec succès.",
      });

      onSuccess?.();
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'avis:", error);
      toast({
        title: "Erreur",
        description:
          "Une erreur est survenue lors de l'envoi de votre avis. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Note
        </label>
        <Rating
          value={note}
          onChange={(value) =>
            setValue("note", value, { shouldValidate: true })
          }
          size={32}
        />
        {errors.note && (
          <p className="mt-1 text-sm text-red-600">{errors.note.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="commentaire"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Commentaire (optionnel)
        </label>
        <Textarea
          id="commentaire"
          {...register("commentaire")}
          rows={4}
          className={`w-full ${errors.commentaire ? "border-red-300" : ""}`}
          placeholder="Décrivez votre expérience avec ce professionnel..."
        />
        {errors.commentaire && (
          <p className="mt-1 text-sm text-red-600">
            {errors.commentaire.message}
          </p>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Annuler
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            "Publier mon avis"
          )}
        </Button>
      </div>
    </form>
  );
};

export default AvisForm;
