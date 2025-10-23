import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { useAuthStore } from "../stores/authStore";
import { Calendar, momentLocalizer, type SlotInfo } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { v4 as uuidv4 } from "uuid";
import { API_BASE_URL } from "../config";

const MySwal = withReactContent(Swal);

// Définition du type pour les événements du calendrier
interface CalendarEventExtended {
  target: HTMLElement;
  id: string | number;
  title: string;
  start: Date;
  end: Date;
  available: boolean;
  resource?: string | number;
}

// Configurer le calendrier en française
moment.locale("fr", {
  week: {
    dow: 1, // Premier jour de la semaine = lundi
    doy: 4, // La semaine qui contient le 4 janvier est la première de l'année
  },
  weekdays: "Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi".split("_"),
  weekdaysShort: "Dim_Lun_Mar_Mer_Jeu_Ven_Sam".split("_"),
  months:
    "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split(
      "_"
    ),
  monthsShort:
    "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
});

const localizer = momentLocalizer(moment);

interface Professionnel {
  id?: string;
  nom?: string;
  prenom?: string;
  email?: string;
  specialite?: string;
  description?: string;
  experience?: string; // Chaîne car dans db.json c'est une chaîne (ex: "15 ans")
  note?: number;
  avis?: number;
  photo?: string;
  imageUrl?: string; // Utilisé dans db.json pour l'URL de l'image
  localisation?: string;
  adresse?: string;
  tarif?: string; // Chaîne car dans db.json c'est une chaîne (ex: "25000 FCFA")
  telephone?: string;
  bio?: string;
  langues?: string[];
  formations?: string[];
  creneauxDisponibles?: {
    jour: string;
    heures: string[];
  }[];
}

interface RendezVousFormData {
  nom: string;
  email: string;
  telephone: string;
  date: string;
  heure: string;
  message: string;
}

type PaiementFormData = {
  methode: "wave" | "orange_money";
  numero: string;
  montant: number | string; // Accepte à la fois un nombre et une chaîne pour la conversion
  rendezVousId?: string;
};

const ProfessionnelDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [professionnel, setProfessionnel] = useState<Professionnel>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<
    "about" | "appointment" | "calendar"
  >("about");
  const [formData, setFormData] = useState<RendezVousFormData>({
    nom: "",
    email: "",
    telephone: "",
    date: "",
    heure: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<RendezVousFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [showPaiementForm, setShowPaiementForm] = useState<boolean>(false);
  const [rendezVousId, setRendezVousId] = useState<string>("");

  // Référence pour le formulaire
  const formRef = React.useRef<HTMLDivElement>(null);

  // Récupérer l'utilisateur connecté depuis le store d'authentification
  const { user } = useAuthStore();

  // Mettre à jour les champs du formulaire avec les informations de l'utilisateur connecté
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        nom: user.nom,
        email: user.email,
        telephone: user.telephone || "",
      }));
    }
  }, [user]);

  // Charger les données du professionnel
  useEffect(() => {
    console.log("Début du chargement des données du professionnel"); // Debug log
    const fetchProfessionnel = async () => {
      if (!id) {
        setError("ID du professionnel manquant dans l'URL");
        setLoading(false);
        return;
      }

      try {
        console.log("Tentative de récupération du professionnel avec ID:", id);
        const response = await fetch(`${API_BASE_URL}/professionnels/${id}`);
        console.log("Réponse du serveur:", response);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Erreur de réponse:", errorText);
          throw new Error("Professionnel non trouvé");
        }

        const data: Professionnel = await response.json();
        console.log("Données du professionnel reçues:", data); // Debug log

        if (!data) {
          throw new Error("Aucune donnée reçue pour ce professionnel");
        }

        setProfessionnel(data);
        setError(null);
      } catch (err) {
        console.error("Erreur lors du chargement du professionnel:", err);
        setError(
          "Erreur lors du chargement des données du professionnel. Veuillez vérifier l'ID et réessayer."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionnel();
  }, [id]);

  // Générer les dates disponibles avec des créneaux
  const generateAvailableDates = useCallback((): {
    date: Date;
    formatted: string;
  }[] => {
    const availableDates: { date: Date; formatted: string }[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Vérifier si creneauxDisponibles est défini et est un tableau
    if (!Array.isArray(professionnel.creneauxDisponibles)) {
      return [];
    }

    // Créer un tableau des noms de jours en minuscules pour la comparaison
    const daysOfWeek = [
      "dimanche",
      "lundi",
      "mardi",
      "mercredi",
      "jeudi",
      "vendredi",
      "samedi",
    ];

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Vérifier si c'est un jour de la semaine où le professionnel est disponible
      const dayIndex = date.getDay();
      const dayName = daysOfWeek[dayIndex];

      // Trouver la disponibilité pour ce jour
      const disponibilite = professionnel.creneauxDisponibles.find(
        (c) =>
          c &&
          c.jour &&
          typeof c.jour === "string" &&
          c.jour.toLowerCase() === dayName &&
          Array.isArray(c.heures) &&
          c.heures.length > 0
      );

      if (disponibilite) {
        availableDates.push({
          date,
          formatted: `${
            dayName.charAt(0).toUpperCase() + dayName.slice(1)
          } ${date.getDate()} ${moment(date).format(
            "MMMM"
          )} ${date.getFullYear()}`,
        });
      }
    }

    return availableDates;
  }, [professionnel.creneauxDisponibles]);

  // Obtenir les dates disponibles
  const availableDates = useMemo(
    () => generateAvailableDates(),
    [generateAvailableDates]
  );

  // Gérer la sélection d'une date dans le calendrier
  const handleSelectSlot = useCallback((slotInfo: SlotInfo) => {
    const { start, action } = slotInfo;
    if (!start) return;

    // Mettre à jour la position du tooltip si nécessaire
    if (action === "select" && slotInfo.bounds) {
      setTooltipPosition({
        x: slotInfo.bounds.left,
        y: slotInfo.bounds.top,
        clientX: slotInfo.bounds.left,
        clientY: slotInfo.bounds.top,
      });
    }

    setSelectedDate(start);
    setFormData((prev) => ({
      ...prev,
      date: moment(start).format("YYYY-MM-DD"),
      heure: "", // Réinitialiser l'heure lors du changement de date
    }));
    setActiveTab("appointment");

    // Faire défiler jusqu'au formulaire
    setTimeout(() => {
      const formElement = document.getElementById("rendez-vous-form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }, []);

  // Mettre à jour la date sélectionnée et réinitialiser l'heure
  useEffect(() => {
    if (formData.date) {
      const newDate = new Date(formData.date);
      if (!isNaN(newDate.getTime())) {
        setSelectedDate(newDate);
      }
      setFormData((prev) => ({
        ...prev,
        heure: "", // Réinitialiser l'heure lors du changement de date
      }));
    }
  }, [formData.date]);

  // Gérer les changements dans le formulaire
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Si la date change, réinitialiser l'heure sélectionnée
    if (name === "date") {
      setFormData((prev) => ({
        ...prev,
        date: value,
        heure: "", // Réinitialiser l'heure lors du changement de date
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Effacer l'erreur du champ modifié
    if (formErrors[name as keyof RendezVousFormData]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Valider le formulaire
  const validateForm = (): boolean => {
    const errors: Partial<RendezVousFormData> = {};
    let isValid = true;

    if (!formData.nom.trim()) {
      errors.nom = "Le nom est requis";
      isValid = false;
    }

    // Validation de l'email
    if (!formData.email) {
      errors.email = "L'email est requis";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Veuillez entrer un email valide";
      isValid = false;
    }

    // Validation de la date
    if (!formData.date) {
      errors.date = "Veuillez sélectionner une date";
      isValid = false;
    } else if (new Date(formData.date) < new Date()) {
      // Comparaison simple, peut nécessiter d'ignorer l'heure
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(formData.date) < today) {
        errors.date = "La date ne peut pas être dans le passé";
        isValid = false;
      }
    }

    // Validation de l'heure
    if (!formData.heure) {
      errors.heure = "Veuillez sélectionner une heure";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Gérer la soumission du formulaire de rendez-vous
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm() && user) {
      setIsSubmitting(true);
      try {
        // Vérification des disponibilités
        const response = await fetch(
          `${API_BASE_URL}/rendezVous?professionnelId=${id}&date=${formData.date}&heure=${formData.heure}`
        );
        const existingRendezVous: Array<{ id: string }> = await response.json();

        if (existingRendezVous && existingRendezVous.length > 0) {
          throw new Error(
            "Ce créneau n'est plus disponible. Veuillez en choisir un autre."
          );
        }

        // Générer un ID de rendez-vous unique
        const newRendezVousId = uuidv4();
        setRendezVousId(newRendezVousId);

        // Afficher le formulaire de paiement
        setShowPaiementForm(true);

        // Faire défiler jusqu'au formulaire de paiement
        setTimeout(() => {
          const element = document.getElementById("paiement-form");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } catch (error) {
        console.error(
          "Erreur lors de la vérification des disponibilités:",
          error
        );
        MySwal.fire({
          title: "Erreur",
          text:
            error instanceof Error
              ? error.message
              : "Une erreur est survenue lors de la vérification des disponibilités. Veuillez réessayer.",
          icon: "error",
          confirmButtonColor: "#015635",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  /* Fonction pour envoyer les emails de confirmation
  const sendConfirmationEmails = async (
    rendezVousData: {
      utilisateurEmail: string;
      utilisateurNom: string;
      date: string;
      heure: string;
      telephone?: string;
      message?: string;
    },
    professionnel: Professionnel
  ) => {
    try {
      // Envoyer l'email à l'utilisateur
      await fetch(`${API_BASE_URL}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: rendezVousData.utilisateurEmail,
          subject: 'Confirmation de votre rendez-vous',
          html: `
            <h1>Confirmation de votre rendez-vous</h1>
            <p>Bonjour ${rendezVousData.utilisateurNom},</p>
            <p>Votre rendez-vous a été confirmé avec succès.</p>
            <h3>Détails du rendez-vous :</h3>
            <p><strong>Professionnel :</strong> ${professionnel.nom || 'Non spécifié'}</p>
            <p><strong>Date :</strong> ${moment(rendezVousData.date).format('DD/MM/YYYY')}</p>
            <p><strong>Heure :</strong> ${rendezVousData.heure}</p>
            <p><strong>Lieu :</strong> ${professionnel.adresse || 'Adresse à confirmer'}</p>
            <p><strong>Téléphone :</strong> ${rendezVousData.telephone || 'Non renseigné'}</p>
            ${rendezVousData.message ? `<p><strong>Votre message :</strong> ${rendezVousData.message}</p>` : ''}
            <p>Merci de votre confiance !</p>
          `
        })
      });

      // Envoyer l'email au professionnel
      if (professionnel.email) {
        await fetch(`${API_BASE_URL}/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: professionnel.email,
            subject: 'Nouveau rendez-vous',
            html: `
              <h1>Nouveau rendez-vous</h1>
              <p>Bonjour ${professionnel.nom || 'Cher professionnel'},</p>
              <p>Un nouveau rendez-vous a été pris.</p>
              <h3>Détails du rendez-vous :</h3>
              <p><strong>Patient :</strong> ${rendezVousData.utilisateurNom}</p>
              <p><strong>Email :</strong> ${rendezVousData.utilisateurEmail}</p>
              <p><strong>Téléphone :</strong> ${rendezVousData.telephone || 'Non renseigné'}</p>
              <p><strong>Date :</strong> ${moment(rendezVousData.date).format('DD/MM/YYYY')}</p>
              <p><strong>Heure :</strong> ${rendezVousData.heure}</p>
              ${rendezVousData.message ? `<p><strong>Message :</strong> ${rendezVousData.message}</p>` : ''}
            `
          })
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des emails de confirmation:", error);
      // On ne bloque pas le flux pour une erreur d'envoi d'email
    }
  };*/

  // Gestion de la soumission du formulaire de paiement
  const onSubmitPaiement: SubmitHandler<PaiementFormData> = async (data) => {
    console.log("onSubmitPaiement appelée avec les données:", data); // DEBUG

    if (!user || !professionnel) {
      console.error("Utilisateur ou professionnel manquant");
      return;
    }

    // Afficher la confirmation de paiement
    const confirmResult = await MySwal.fire({
      title: "CONFIRMATION",
      text: "Êtes-vous sûr de vouloir procéder au paiement ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#015635",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, procéder au paiement",
      cancelButtonText: "Annuler",
    });

    if (!confirmResult.isConfirmed) {
      console.log("Paiement annulé par l'utilisateur");
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("Début de l'enregistrement du rendez-vous...");

      // Créer l'objet rendez-vous
      const rendezVousData = {
        id: rendezVousId,
        utilisateurId: user.id,
        utilisateurNom: formData.nom,
        utilisateurEmail: formData.email,
        professionnelId: id,
        professionnelNom: professionnel.nom || "",
        professionnelEmail: professionnel.email || "",
        date: formData.date,
        heure: formData.heure,
        statut: "confirmé",
        createdAt: new Date().toISOString(),
        message: formData.message,
        telephone: formData.telephone,
        paiement: {
          methode: data.methode,
          montant: data.montant,
          statut: "payé",
          date: new Date().toISOString(),
        },
      };

      console.log("Données du rendez-vous à enregistrer:", rendezVousData);

      // Enregistrer le rendez-vous dans la base de données
      const response = await fetch("http://localhost:3000/rendezVous", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rendezVousData),
      });

      console.log("Réponse du serveur:", response.status);

      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement du rendez-vous");
      }

      const savedData = await response.json();
      console.log("Rendez-vous enregistré avec succès:", savedData);

      // Simuler le traitement du paiement
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Afficher le message de confirmation
      await MySwal.fire({
        title: "Réservation confirmée !",
        html: `
        <div style="text-align: left; padding: 10px;">
          <p style="margin-bottom: 15px;">Votre rendez-vous a été enregistré avec succès.</p>
          <p style="margin-bottom: 10px;"><strong>📧 Vous recevrez un email de confirmation dans les prochaines heures.</strong></p>
          <hr style="margin: 15px 0;">
          <p style="margin-bottom: 5px;"><strong>Détails du rendez-vous :</strong></p>
          <p style="margin: 5px 0;">📅 Date : ${moment(formData.date).format(
            "DD/MM/YYYY"
          )}</p>
          <p style="margin: 5px 0;">🕐 Heure : ${formData.heure}</p>
          <p style="margin: 5px 0;">👨‍⚕️ Professionnel : ${professionnel.nom}</p>
          <p style="margin: 5px 0;">💰 Montant : ${data.montant} FCFA</p>
        </div>
      `,
        icon: "success",
        confirmButtonColor: "#015635",
        confirmButtonText: "OK",
        timer: 8000,
        timerProgressBar: true,
      });

      // Réinitialiser les formulaires
      resetForm();
      resetPaiementForm();
      setShowPaiementForm(false);
      setSubmitSuccess(true);
      navigate("/home");
    } catch (error) {
      console.error("Erreur lors de la prise de rendez-vous:", error);
      await MySwal.fire({
        title: "Erreur",
        text: "Une erreur est survenue lors de l'enregistrement du rendez-vous. Veuillez réessayer.",
        icon: "error",
        confirmButtonColor: "#015635",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Schéma de validation pour le formulaire de paiement
  const paiementSchema = z.object({
    methode: z
      .string()
      .refine((val) => val === "wave" || val === "orange_money", {
        message: "Veuillez sélectionner un moyen de paiement valide",
      }),
    numero: z
      .string()
      .min(1, "Le numéro est requis")
      .min(9, "Le numéro doit contenir au moins 9 chiffres")
      .max(15, "Le numéro ne peut pas dépasser 15 chiffres")
      .regex(/^[0-9]+$/, "Le numéro ne doit contenir que des chiffres"),
    montant: z.union([
      z
        .number()
        .min(1000, "Le montant minimum est de 1000 FCFA")
        .max(1000000, "Le montant maximum est de 1 000 000 FCFA"),
      z
        .string()
        .transform((val) => {
          const num = Number(val);
          return isNaN(num) ? 0 : num;
        })
        .refine((val) => !isNaN(val) && val >= 1000 && val <= 1000000, {
          message: "Le montant doit être compris entre 1000 et 1 000 000 FCFA",
        }),
    ]),
    rendezVousId: z.string().optional(),
  });

  // Initialisation du formulaire de paiement avec react-hook-form et zod
  const {
    register: registerPaiement,
    handleSubmit: handlePaiementSubmit,
    formState: { errors: paiementErrors },
    reset: resetPaiementForm,
  } = useForm<PaiementFormData>({
    resolver: zodResolver(paiementSchema) as any,
    defaultValues: {
      methode: "wave",
      numero: "",
      montant: (professionnel?.tarif
        ? parseInt(String(professionnel.tarif).replace(/\D/g, ""), 10) || 0
        : 0) as number | string,
      rendezVousId: undefined,
    },
  });

  // Mettre à jour le montant par défaut si le tarif du professionnel change
  useEffect(() => {
    if (professionnel?.tarif) {
      const tarifNum =
        parseInt(String(professionnel.tarif).replace(/\D/g, ""), 10) || 0;
      resetPaiementForm({
        montant: tarifNum,
        methode: "wave",
        numero: "",
        rendezVousId: undefined,
      } as PaiementFormData);
    }
  }, [professionnel?.tarif, resetPaiementForm]);

  // Réinitialiser le formulaire de rendez-vous
  const resetForm = () => {
    setFormData({
      nom: user?.nom || "",
      email: user?.email || "",
      telephone: user?.telephone || "",
      date: "",
      heure: "",
      message: "",
    });
    setFormErrors({});
  };

  // Générer les événements du calendrier à partir des créneaux disponibles
  const getEventsFromCreneaux = (): CalendarEventExtended[] => {
    const events: CalendarEventExtended[] = [];
    if (!professionnel.creneauxDisponibles) return events;

    const daysOfWeek = [
      "dimanche",
      "lundi",
      "mardi",
      "mercredi",
      "jeudi",
      "vendredi",
      "samedi",
    ];
    const today = new Date();

    // Pour les 30 prochains jours
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      date.setHours(0, 0, 0, 0); // Normaliser la date

      const dayName = daysOfWeek[date.getDay()];
      const creneauForDay = professionnel.creneauxDisponibles.find(
        (c) => c.jour.toLowerCase() === dayName.toLowerCase()
      );

      if (creneauForDay?.heures) {
        creneauForDay.heures.forEach((heure, index) => {
          const [hours, minutes] = heure.split(":").map(Number);
          const start = new Date(date);
          start.setHours(hours, minutes, 0, 0);

          // On suppose que chaque créneau dure 1 heure
          const end = new Date(start);
          end.setHours(start.getHours() + 1);

          events.push({
            id: `${date.getTime()}-${index}`,
            title: "Disponible",
            start,
            end,
            available: true,
            target: undefined,
          });
        });
      }
    }

    return events;
  };

  // Utilisation de useMemo pour éviter les recalculs inutiles
  const events = useMemo(
    () => getEventsFromCreneaux(),
    [professionnel.creneauxDisponibles]
  );

  // Générer les créneaux horaires disponibles pour la date sélectionnée
  const generateTimeSlots = useCallback((): string[] => {
    try {
      if (!selectedDate || !professionnel.creneauxDisponibles) return [];

      const day = selectedDate.getDay();
      const dayNames = [
        "dimanche",
        "lundi",
        "mardi",
        "mercredi",
        "jeudi",
        "vendredi",
        "samedi",
      ];
      const dayName = dayNames[day];

      if (!dayName) return [];

      // Trouver les disponibilités pour ce jour
      const disponibilite = professionnel.creneauxDisponibles.find(
        (d) => d.jour && d.jour.toLowerCase() === dayName
      );

      if (!disponibilite) return [];

      // Filtrer les créneaux passés pour le jour sélectionné
      const now = new Date();
      const isToday = selectedDate.toDateString() === now.toDateString();

      let availableSlots = disponibilite.heures?.filter(Boolean) || [];

      if (isToday) {
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        availableSlots = availableSlots.filter((slot) => {
          const [hours, minutes] = slot.split(":").map(Number);
          return (
            hours > currentHour ||
            (hours === currentHour && minutes > currentMinute)
          );
        });
      }

      return availableSlots.sort();
    } catch (error) {
      console.error(
        "Erreur lors de la génération des créneaux horaires:",
        error
      );
      return [];
    }
  }, [selectedDate, professionnel.creneauxDisponibles]);

  // Gérer l'ajout d'un nouvel avis
  const handleAddAvis = () => {
    // Ici, vous pouvez implémenter la logique pour ouvrir un formulaire d'ajout d'avis
    // Par exemple, définir un état pour afficher un modal de formulaire
    alert("Fonctionnalité d'ajout d'avis bientôt disponible !");
  };

  // Utiliser imageUrl comme source de l'image si photo n'est pas disponible
  const imageSource = professionnel.imageUrl || professionnel.photo;
  const fullName = `${professionnel.prenom || ""} ${
    professionnel.nom || ""
  }`.trim();
  const location =
    professionnel.adresse || professionnel.localisation || "Non spécifiée";
  const experience = professionnel.experience || "Non spécifiée";

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#015635] mb-4"></div>
        <p className="text-gray-600">Chargement du professionnel {id}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Erreur lors du chargement
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
                <p className="mt-2">ID du professionnel: {id}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Réessayer
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          Retour à la liste des professionnels
        </button>
      </div>
    );
  }

  if (!professionnel) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700">
          Professionnel non trouvé
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-[#015635] text-white rounded hover:bg-[#014429] transition-colors"
        >
          Retour à la liste
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Section des informations du professionnel */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-20">
        <div className="md:flex">
          {/* Photo et informations de base */}
          <div className="md:w-1/3 p-6">
            <div className="w-full h-64 md:h-80 bg-gray-200 rounded-lg overflow-hidden">
              {imageSource ? (
                <img
                  src={imageSource}
                  alt={fullName || "Photo du professionnel"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // En cas d'erreur de chargement de l'image
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                  <svg
                    className="h-24 w-24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div className="mt-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {fullName || "Nom non disponible"}
              </h1>
              <p className="text-lg text-[#015635] font-medium">
                {professionnel.specialite || "Spécialité non spécifiée"}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`h-5 w-5 ${
                          star <= Math.round(professionnel.note || 0)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {professionnel.note ? professionnel.note.toFixed(1) : "N/A"}
                    ({professionnel.avis || 0} avis)
                  </span>
                </div>
                <button
                  onClick={handleAddAvis}
                  className="ml-4 px-3 py-1 bg-[#015635] text-white text-sm rounded hover:bg-[#01422a] transition-colors"
                >
                  Ajouter un avis
                </button>
              </div>

              {professionnel.langues && professionnel.langues.length > 0 && (
                <div className="mt-4">
                  <p className="font-medium text-gray-700">Langues parlées :</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {professionnel.langues.map((langue, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded"
                      >
                        {langue}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Détails et formulaire de rendez-vous */}
          <div className="md:w-2/3 p-6 border-t md:border-t-0 md:border-l border-gray-200">
            {/* Navigation par onglets */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("about")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "about"
                      ? "border-[#015635] text-[#015635]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  À propos
                </button>
                <button
                  onClick={() => setActiveTab("calendar")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "calendar"
                      ? "border-[#015635] text-[#015635]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Disponibilité
                </button>
                <button
                  onClick={() => setActiveTab("appointment")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "appointment"
                      ? "border-[#015635] text-[#015635]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Prendre rendez-vous
                </button>
              </nav>
            </div>

            {/* Contenu des onglets */}
            <div className="mt-6">
              <div ref={formRef}>
                {activeTab === "about" && (
                  <div>
                    <p className="text-gray-700 whitespace-pre-line">
                      {professionnel.description || ""}
                    </p>

                    <div className="mt-4 space-y-2">
                      <p className="text-gray-700">
                        <span className="font-medium">Expérience :</span>{" "}
                        {experience}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Localisation :</span>{" "}
                        {location}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Tarif moyen :</span>{" "}
                        {professionnel.tarif}
                      </p>
                    </div>

                    {professionnel.formations &&
                      professionnel.formations.length > 0 && (
                        <div className="mt-6">
                          <h3 className="text-md font-medium text-gray-900 mb-2">
                            Formations et certifications
                          </h3>
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {professionnel.formations.map(
                              (formation, index) => (
                                <li key={index}>{formation}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                  </div>
                )}

                {activeTab === "appointment" && (
                  <div id="rendez-vous-form">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Prendre rendez-vous
                    </h2>

                    {submitSuccess ? (
                      <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg
                              className="h-5 w-5 text-green-500"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-green-700">
                              Votre rendez-vous a été confirmé avec succès !
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="nom"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Nom complet{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="nom"
                              name="nom"
                              value={formData.nom}
                              onChange={handleChange}
                              disabled={!!user?.nom}
                              className={`mt-1 block w-full border ${
                                formErrors.nom
                                  ? "border-red-300"
                                  : "border-gray-300"
                              } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#015635] focus:border-[#015635] sm:text-sm ${
                                user?.nom ? "bg-gray-100" : ""
                              }`}
                            />
                            {formErrors.nom && (
                              <p className="mt-1 text-sm text-red-600">
                                {formErrors.nom}
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Email <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              disabled={!!user?.email}
                              className={`mt-1 block w-full border ${
                                formErrors.email
                                  ? "border-red-300"
                                  : "border-gray-300"
                              } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#015635] focus:border-[#015635] sm:text-sm ${
                                user?.email ? "bg-gray-100" : ""
                              }`}
                            />
                            {formErrors.email && (
                              <p className="mt-1 text-sm text-red-600">
                                {formErrors.email}
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              htmlFor="date"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Date <span className="text-red-500">*</span>
                            </label>
                            <select
                              id="date"
                              name="date"
                              value={formData.date}
                              onChange={handleChange}
                              className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border ${
                                formErrors.date
                                  ? "border-red-300"
                                  : "border-gray-300"
                              } focus:outline-none focus:ring-[#015635] focus:border-[#015635] sm:text-sm rounded-md`}
                              required
                            >
                              <option value="">Sélectionnez une date</option>
                              {availableDates.map((dateObj, index) => (
                                <option
                                  key={index}
                                  value={moment(dateObj.date).format(
                                    "YYYY-MM-DD"
                                  )}
                                >
                                  {dateObj.formatted}
                                </option>
                              ))}
                            </select>
                            {formErrors.date && (
                              <p className="mt-1 text-sm text-red-600">
                                {formErrors.date}
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              htmlFor="heure"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Heure <span className="text-red-500">*</span>
                            </label>
                            <select
                              id="heure"
                              name="heure"
                              value={formData.heure}
                              onChange={handleChange}
                              disabled={!formData.date}
                              className={`mt-1 block w-full border ${
                                formErrors.heure
                                  ? "border-red-300"
                                  : "border-gray-300"
                              } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#015635] focus:border-[#015635] sm:text-sm ${
                                !formData.date ? "bg-gray-100" : ""
                              }`}
                              required
                            >
                              <option value="">
                                {!formData.date
                                  ? "Sélectionnez d'abord une date"
                                  : generateTimeSlots().length === 0
                                  ? "Aucun créneau disponible pour cette date"
                                  : "Sélectionnez une heure"}
                              </option>
                              {formData.date &&
                                generateTimeSlots().map((time, index) => (
                                  <option key={index} value={time}>
                                    {time}
                                  </option>
                                ))}
                            </select>
                            {formErrors.heure && (
                              <p className="mt-1 text-sm text-red-600">
                                {formErrors.heure}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Message (facultatif)
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="message"
                              name="message"
                              rows={4}
                              value={formData.message}
                              onChange={handleChange}
                              className="shadow-sm focus:ring-[#015635] focus:border-[#015635] mt-1 block w-full border border-gray-300 rounded-md sm:text-sm p-2"
                              placeholder="Décrivez brièvement la raison de votre consultation..."
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-end">
                          <button
                            type="button"
                            onClick={() => setActiveTab("about")}
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#015635]"
                          >
                            Annuler
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="ml-3 inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#015635] hover:bg-[#014429] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#015635] disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? "Envoi en cours..." : "Suivant"}
                          </button>
                        </div>

                        {/* Formulaire de paiement */}
                        {showPaiementForm && (
                          <div
                            id="paiement-form"
                            className="mt-8 p-6 border border-gray-200 rounded-lg bg-gray-50"
                          >
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                              Paiement sécurisé
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                              Veuillez compléter le paiement pour confirmer
                              votre rendez-vous.
                            </p>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Moyen de paiement{" "}
                                  <span className="text-red-500">*</span>
                                </label>
                                <div className="space-y-2">
                                  <div className="flex items-center">
                                    <input
                                      id="wave"
                                      type="radio"
                                      value="wave"
                                      className="h-4 w-4 text-[#015635] focus:ring-[#015635] border-gray-300"
                                      {...registerPaiement("methode")}
                                    />
                                    <label
                                      htmlFor="wave"
                                      className="ml-2 block text-gray-700 flex items-center text-bold"
                                    >
                                      <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm9rYPURKIok7K0ZF22oqFgMbzIHgNCauVQA&s"
                                        alt="Wave"
                                        className="h-6 ml-2 pr-2"
                                        onError={(e) => {
                                          const target =
                                            e.target as HTMLImageElement;
                                          target.src = "";
                                          target.alt = "Wave";
                                        }}
                                      />{" "}
                                      Wave
                                    </label>
                                  </div>
                                  <div className="flex items-center">
                                    <input
                                      id="orange_money"
                                      type="radio"
                                      value="orange_money"
                                      className="h-4 w-4 text-[#015635] focus:ring-[#015635] border-gray-300"
                                      {...registerPaiement("methode")}
                                    />
                                    <label
                                      htmlFor="orange_money"
                                      className="ml-2 block text-bold text-gray-700 flex items-center"
                                    >
                                      <img
                                        src="https://www.seneguide.com/images/uploads/orangemoney-6662d1b215891.png"
                                        alt="Orange Money"
                                        className="h-6 ml-2 pr-2"
                                        onError={(e) => {
                                          const target =
                                            e.target as HTMLImageElement;
                                          target.src = "";
                                          target.alt = "Orange Money";
                                        }}
                                      />{" "}
                                      Orange Money
                                    </label>
                                  </div>
                                </div>
                                {paiementErrors.methode && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {paiementErrors.methode.message}
                                  </p>
                                )}
                              </div>

                              <div>
                                <label
                                  htmlFor="numero"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Numéro de téléphone{" "}
                                  <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">
                                      +221
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    id="numero"
                                    className={`focus:ring-[#015635] focus:border-[#015635] block w-full pl-16 pr-12 sm:text-sm border ${
                                      paiementErrors.numero
                                        ? "border-red-300"
                                        : "border-gray-300"
                                    } rounded-md py-2`}
                                    placeholder="0700000000"
                                    {...registerPaiement("numero")}
                                  />
                                </div>
                                {paiementErrors.numero && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {paiementErrors.numero.message}
                                  </p>
                                )}
                              </div>

                              <div>
                                <label
                                  htmlFor="montant"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Montant (FCFA){" "}
                                  <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">
                                      FCFA
                                    </span>
                                  </div>
                                  <input
                                    type="number"
                                    id="montant"
                                    className={`focus:ring-[#015635] focus:border-[#015635] block w-full pl-16 pr-12 sm:text-sm border ${
                                      paiementErrors.montant
                                        ? "border-red-300"
                                        : "border-gray-300"
                                    } rounded-md py-2`}
                                    {...registerPaiement("montant", {
                                      valueAsNumber: true,
                                    })}
                                    disabled={!!professionnel.tarif}
                                  />
                                </div>
                                {paiementErrors.montant && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {paiementErrors.montant.message}
                                  </p>
                                )}
                              </div>

                              <div className="pt-4 flex items-center justify-end space-x-3">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setShowPaiementForm(false);
                                    resetPaiementForm();
                                  }}
                                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#015635]"
                                >
                                  Annuler
                                </button>
                                <button
                                  type="submit"
                                  onClick={onSubmitPaiement}
                                  className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#015635] hover:bg-[#014429] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#015635] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {isSubmitting
                                    ? "Traitement..."
                                    : "Payer maintenant"}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        <p className="text-xs text-gray-500 mt-4">
                          En confirmant ce rendez-vous, vous acceptez nos
                          conditions d'utilisation et notre politique de
                          confidentialité.
                        </p>
                      </form>
                    )}
                  </div>
                )}

                {activeTab === "calendar" && (
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Calendrier des disponibilités
                      </h2>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="inline-block w-3 h-3 rounded-full bg-[#015635] mr-1"></span>
                        <span>Disponible</span>
                      </div>
                    </div>
                    <div className="h-[400px] bg-white rounded-lg shadow p-4">
                      <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        selectable={true}
                        onSelectSlot={handleSelectSlot} // <-- CORRECTION: Utilisation du bon gestionnaire
                        views={["month", "week", "day", "agenda"]}
                        defaultView="week"
                        step={60}
                        timeslots={1}
                        min={new Date(0, 0, 0, 8, 0, 0)} // 8h
                        max={new Date(0, 0, 0, 20, 0, 0)} // 20h
                        toolbar={true} // Remis à true pour la navigation
                        defaultDate={new Date()}
                        showMultiDayTimes={false}
                        showAllEvents={true}
                        titleAccessor={() => ""}
                        eventPropGetter={(event: CalendarEventExtended) => ({
                          style: {
                            backgroundColor: event.available
                              ? "#015635"
                              : "#e53e3e",
                            borderRadius: "4px",
                            opacity: 0.8,
                            color: "white",
                            border: "0px",
                            display: "block",
                            fontSize: "0.8rem",
                            cursor: event.available ? "pointer" : "not-allowed",
                          },
                        })}
                        onSelectEvent={(event: CalendarEventExtended) => {
                          if (event.available) {
                            const target = event.target as HTMLElement;
                            const rect = target.getBoundingClientRect();

                            // Création d'un objet avec les propriétés nécessaires pour le tooltip
                            const bounds: DOMRect & {
                              clientX: number;
                              clientY: number;
                            } = {
                              left: rect.left,
                              top: rect.top,
                              right: rect.right,
                              bottom: rect.bottom,
                              width: rect.width,
                              height: rect.height,
                              x: rect.x,
                              y: rect.y,
                              toJSON: rect.toJSON.bind(rect),
                              // Propriétés supplémentaires nécessaires
                              clientX: rect.left,
                              clientY: rect.top,
                              // Implémentation des méthodes manquantes
                              contains: rect.contains.bind(rect),
                              item: rect.item?.bind(rect),
                              length: rect.length || 0,
                              [Symbol.iterator]:
                                rect[Symbol.iterator]?.bind(rect),
                            };

                            handleSelectSlot({
                              start: event.start,
                              end:
                                event.end ||
                                new Date(
                                  event.start.getTime() + 60 * 60 * 1000
                                ),
                              slots: [event.start],
                              action: "select",
                              bounds: {
                                x: bounds.x,
                                y: bounds.y,
                                clientX: bounds.clientX,
                                clientY: bounds.clientY,
                                top: bounds.top,
                                bottom: bounds.bottom,
                                left: bounds.left,
                                right: bounds.right,
                                width: bounds.width,
                                height: bounds.height,
                                toJSON: bounds.toJSON,
                              },
                              box: bounds,
                              resourceId: undefined,
                            });

                            setActiveTab("appointment");
                          }
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Avis des patients */}
      <div className="mt-12 bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">
              Avis des patients
            </h2>
            <button
              type="button"
              onClick={handleAddAvis}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#015635] hover:bg-[#014429] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#015635]"
            >
              Laisser un avis
            </button>
          </div>

          <div className="space-y-6">
            {/* Avis exemple */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  <span className="font-medium">AM</span>
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900">Aminata M.</p>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`h-4 w-4 ${
                          star <= 5 ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="ml-auto text-sm text-gray-500">
                  Il y a 2 semaines
                </div>
              </div>
              <div className="mt-3 text-gray-700">
                <p>
                  Très bon professionnel, à l'écoute et attentionné. Je
                  recommande vivement !
                </p>
              </div>
            </div>

            {/* Bouton pour voir plus d'avis */}
            <div className="text-center">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#015635]"
              >
                Voir plus d'avis
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionnelDetail;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setTooltipPosition(arg0: {
  x: number;
  y: number;
  clientX: number;
  clientY: number;
}) {
  throw new Error("Function not implemented.");
}
