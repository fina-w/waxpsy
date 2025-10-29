import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { TemoignageSkeletonGrid } from "./skeletons";
import SearchFilters from "./ui/SearchFilters";
import { BriefcaseBusiness, Star } from "lucide-react";
import Footer from "./footer";
import { API_BASE_URL } from "../config";

interface Professionnel {
  id: string;
  nom: string;
  specialite: string;
  adresse: string;
  imageUrl: string;
  telephone: string;
  email: string;
  description: string;
  verification: boolean;
  langues: string[];
  diplome: string;
  experience: string;
  tarif: string;
  creneauxDisponibles: { jour: string; heures: string[] }[];
  avis: {
    id: string;
    utilisateurId: string;
    utilisateurNom: string;
    note: number;
    commentaire: string;
    date: string;
  }[];
  rating: string;
  role?: string;
  verifiee?: boolean;
  bio?: string;
}

const ProfessionalsList: React.FC = () => {
  const [professionnels, setProfessionnels] = useState<Professionnel[]>([]);
  const [filteredProfessionnelsState, setFilteredProfessionnelsState] =
    useState<Professionnel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string>
  >({
    categorie: "all",
    langues: "all",
    zone: "all",
    prix: "all",
    role: "all",
    specialite: "all",
  });

  const [languesOptions, setLanguesOptions] = useState<string[]>([]);
  const [zoneOptions, setZoneOptions] = useState<string[]>([]);
  const [specialiteOptions, setSpecialiteOptions] = useState<string[]>([]);

  // Configuration des filtres pour SearchFilters
  const filters = [
    {
      name: "specialite",
      label: "Spécialité",
      type: "select" as const,
      options: [
        { value: "all", label: "Toutes les spécialités" },
        ...specialiteOptions.map((specialite) => ({
          value: specialite,
          label: specialite,
        })),
      ],
      defaultValue: "all",
    },
    {
      name: "troubles",
      label: "Catégories",
      type: "select" as const,
      options: [
        { value: "all", label: "Toutes les troubles" },
        { value: "adulte", label: "Adultes" },
        { value: "enfant", label: "Enfants" },
        { value: "tdah", label: "TDAH" },
        { value: "anxiete", label: "Anxiété" },
        { value: "depression", label: "Dépression" },
        { value: "couple", label: "Thérapie de couple" },
        { value: "famille", label: "Thérapie familiale" },
      ],
      defaultValue: "all",
    },
    {
      name: "langues",
      label: "Langues",
      type: "select" as const,
      options: [
        { value: "all", label: "Toutes les langues" },
        ...languesOptions.map((langue) => ({ value: langue, label: langue })),
      ],
      defaultValue: "all",
    },
    {
      name: "zone",
      label: "Zone",
      type: "select" as const,
      options: [
        { value: "all", label: "Toutes les zones" },
        ...zoneOptions.map((zone) => ({ value: zone, label: zone })),
      ],
      defaultValue: "all",
    },
    {
      name: "prix",
      label: "Prix",
      type: "select" as const,
      options: [
        { value: "all", label: "Tous les prix" },
        { value: "0-10000", label: "Moins de 10 000 FCFA" },
        { value: "10000-20000", label: "10 000 - 20 000 FCFA" },
        { value: "20000-30000", label: "20 000 - 30 000 FCFA" },
        { value: "30000+", label: "Plus de 30 000 FCFA" },
      ],
      defaultValue: "all",
    },
  ];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3 colonnes x 3 lignes

  // Calcul de la pagination
  const totalPages = Math.ceil(
    filteredProfessionnelsState.length / itemsPerPage
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProfessionnelsState.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Gestion du changement de page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchProfessionnels = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/professionnels`);
        if (!response.ok) throw new Error("Failed to fetch professionals");
        const professionnelsData = await response.json();

        // Transform data to match component expectations
        const transformedData = professionnelsData.map(
          (pro: Record<string, unknown>) => {
            const avis = Array.isArray(pro.avis)
              ? (pro.avis as Record<string, unknown>[]).map(
                  (a: Record<string, unknown>) => ({
                    id: String(a.id),
                    utilisateurId: String(a.utilisateurId),
                    utilisateurNom: String(a.utilisateurNom || ""),
                    note: Number(a.note),
                    commentaire: String(a.commentaire || ""),
                    date: String(a.date || new Date().toISOString()),
                  })
                )
              : [];
            const avgRating =
              avis.length > 0
                ? (
                    avis.reduce((sum: number, a) => sum + a.note, 0) /
                    avis.length
                  ).toFixed(1)
                : "0.0";

            return {
              id: String(pro.id),
              nom: pro.nom || "",
              specialite: pro.specialite || "",
              adresse: pro.adresse || "",
              imageUrl: pro.imageUrl || pro.avatar || "",
              telephone: pro.telephone || "",
              email: pro.email || "",
              description: pro.bio || pro.description || "",
              verification: Boolean(pro.verifiee || pro.verified),
              langues: Array.isArray(pro.langues)
                ? pro.langues.map(String)
                : [],
              diplome: pro.diplome || "",
              experience: pro.experience || "",
              tarif: pro.tarif || "",
              creneauxDisponibles: Array.isArray(pro.creneauxDisponibles)
                ? pro.creneauxDisponibles
                : [],
              avis,
              rating: avgRating,
            };
          }
        );

        setProfessionnels(transformedData);
        setFilteredProfessionnelsState(transformedData);

        // Extract unique values for filter options
        const allLangues = transformedData.flatMap(
          (pro: Professionnel) => pro.langues || []
        ) as string[];
        const uniqueLangues = Array.from(new Set(allLangues))
          .filter((langue): langue is string => Boolean(langue))
          .sort();
        setLanguesOptions(uniqueLangues);

        // Extract unique zones (régions) from addresses
        const zones = transformedData
          .map((pro: Professionnel) => {
            // Simple extraction de la région depuis l'adresse (premier mot après la virgule)
            const match = pro.adresse?.match(/,\s*([^,]+)/);
            return match ? match[1].trim() : null;
          })
          .filter((zone: string | null): zone is string => Boolean(zone));

        const uniqueZones = Array.from(new Set(zones)).sort() as string[];
        setZoneOptions(uniqueZones);

        // Extract unique specialites
        const specialites = transformedData
          .map((pro: Professionnel) => pro.specialite)
          .filter((specialite: string | undefined): specialite is string =>
            Boolean(specialite)
          ) as string[];

        const uniqueSpecialites = Array.from(
          new Set(specialites)
        ).sort() as string[];
        setSpecialiteOptions(uniqueSpecialites);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchProfessionnels();
  }, []);

  const filteredProfessionnels = useMemo(() => {
    let filtered = [...professionnels];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.nom.toLowerCase().includes(term) ||
          p.email.toLowerCase().includes(term) ||
          p.specialite?.toLowerCase().includes(term) ||
          p.description?.toLowerCase().includes(term) ||
          p.adresse?.toLowerCase().includes(term)
      );
    }

    // Apply category filter
    if (selectedFilters.categorie !== "all") {
      filtered = filtered.filter((p) => {
        const descLower = p.description?.toLowerCase() || "";
        const specLower = p.specialite?.toLowerCase() || "";

        switch (selectedFilters.categorie) {
          case "adulte":
            return descLower.includes("adulte") || specLower.includes("adulte");
          case "enfant":
            return descLower.includes("enfant") || specLower.includes("enfant");
          case "tdah":
            return (
              descLower.includes("tdah") ||
              descLower.includes("neurodéveloppemental") ||
              specLower.includes("tdah")
            );
          case "anxiete":
            return (
              descLower.includes("anxiété") ||
              descLower.includes("anxiete") ||
              specLower.includes("anxiété") ||
              specLower.includes("anxiete")
            );
          case "depression":
            return (
              descLower.includes("dépression") ||
              descLower.includes("depression") ||
              specLower.includes("dépression") ||
              specLower.includes("depression")
            );
          case "couple":
            return descLower.includes("couple") || specLower.includes("couple");
          case "famille":
            return (
              descLower.includes("famille") ||
              descLower.includes("familial") ||
              specLower.includes("famille") ||
              specLower.includes("familial")
            );
          default:
            return true;
        }
      });
    }

    // Apply language filter
    if (selectedFilters.langues !== "all") {
      filtered = filtered.filter((p) =>
        p.langues?.includes(selectedFilters.langues)
      );
    }

    // Apply zone filter
    if (selectedFilters.zone !== "all") {
      filtered = filtered.filter((p) =>
        p.adresse?.includes(selectedFilters.zone)
      );
    }

    // Apply price filter
    if (selectedFilters.prix !== "all") {
      filtered = filtered.filter((p) => {
        if (!p.tarif) return false;

        // Extraire le nombre du tarif (ex: "25000 FCFA" -> 25000)
        const tarif = parseInt(p.tarif.replace(/\D/g, ""));

        switch (selectedFilters.prix) {
          case "0-10000":
            return tarif <= 10000;
          case "10000-20000":
            return tarif > 10000 && tarif <= 20000;
          case "20000-30000":
            return tarif > 20000 && tarif <= 30000;
          case "30000+":
            return tarif > 30000;
          default:
            return true;
        }
      });
    }

    // Apply role filter
    if (selectedFilters.role !== "all") {
      filtered = filtered.filter((p) => {
        const role = p.role?.toLowerCase() || "";
        return role.includes(selectedFilters.role);
      });
    }

    // Apply specialite filter
    if (selectedFilters.specialite !== "all") {
      filtered = filtered.filter(
        (p) =>
          p.specialite?.toLowerCase() ===
          selectedFilters.specialite.toLowerCase()
      );
    }

    return filtered; // Retourner le résultat filtré
  }, [searchTerm, selectedFilters, professionnels]);

  useEffect(() => {
    setFilteredProfessionnelsState(filteredProfessionnels);
  }, [filteredProfessionnels]);

  // Gestion de la recherche
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset à la première page lors d'une nouvelle recherche
  }, []);

  // Gestion du changement de filtre
  const handleFilterChange = useCallback(
    (filterName: string, value: string | number) => {
      setSelectedFilters((prev) => ({
        ...prev,
        [filterName]: value ? value.toString() : "all",
      }));
      setCurrentPage(1); // Reset à la première page lors d'un changement de filtre
    },
    []
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100">
        <div className="container mx-auto px-4 py-8">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8 animate-pulse"></div>
          <TemoignageSkeletonGrid count={6} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen page-bg">
        <div className="container mx-auto px-4 py-8 text-center text-red-600">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen page-bg">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-12 text-green-800">
          Liste des psychologues et psychiatres
        </h1>

        {/* Composant de recherche et filtres */}
        <div className="mb-8 max-w-3xl mx-auto">
          <SearchFilters
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            filters={filters}
            searchPlaceholder="Rechercher un professionnel..."
            className="space-y-4"
          />
        </div>

        {/* Professionals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {currentItems.map((pro: Professionnel) => (
            <div
              key={pro.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
            >
              {/* Photo and Details Row */}
              <div className="flex items-center p-4 space-x-4">
                {/* Photo */}
                <div className="flex-shrink-0">
                  <Link to={`/professionals/${pro.id}`} className="block">
                    <img
                      src={pro.imageUrl}
                      alt={pro.nom}
                      loading="lazy"
                      className="w-28 h-28 rounded-full object-cover shadow-md border-2 border-green-200"
                    />
                  </Link>
                </div>

                {/* Details */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between">
                    <Link to={`/professionals/${pro.id}`} className="block">
                      <h2 className="text-xl font-bold text-green-800 flex-1 hover:underline">
                        {pro.nom}
                      </h2>
                    </Link>
                    {pro.verification && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs ml-2">
                        Vérifié
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 line-clamp-2">
                    <strong>Spécialité:</strong> {pro.specialite},{" "}
                    {pro.description}
                  </p>
                  <div className="flex flex-row">
                    <div className="flex items-center gap-6 text-gray-700 text-sm">
                      {/* Expérience */}
                      <div className="flex items-center gap-2">
                        <BriefcaseBusiness className="w-5 h-5 text-gray-600" />
                        <span>{pro.experience}</span>
                      </div>

                      {/* Taux de satisfaction */}
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-gray-600" />
                        <span>{pro.rating}</span>
                      </div>
                    </div>
                  </div>
                  <p>Tarif : {pro.tarif}</p>
                  <div className="mt-4">
                    <Link
                      to={`/professionals/${pro.id}`}
                      className="inline-block bg-[#015635] text-white px-4 py-2 rounded-md hover:bg-[#014429] transition-colors"
                    >
                      Voir le profil complet
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            {/* Bouton Précédent */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-green-600 text-green-600 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Précédent
            </button>

            {/* Numéros de page */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`w-10 h-10 rounded-lg transition-colors ${
                      currentPage === pageNumber
                        ? "bg-green-600 text-white"
                        : "border border-green-600 text-green-600 hover:bg-green-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              )}
            </div>

            {/* Bouton Suivant */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-green-600 text-green-600 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Suivant
            </button>
          </div>
        )}

        {filteredProfessionnelsState.length === 0 && (
          <p className="text-center text-gray-500 mt-12 text-lg">
            Aucun professionnel trouvé.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProfessionalsList;
