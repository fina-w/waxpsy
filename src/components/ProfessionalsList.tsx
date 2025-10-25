import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ProfileSkeletonList } from "./skeletons";
import SearchFilters from "./ui/SearchFilters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { Briefcase, ThumbsUp } from "lucide-react";

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
}

const ProfessionalsList: React.FC = () => {
  const [professionnels, setProfessionnels] = useState<Professionnel[]>([]);
  const [filteredProfessionnels, setFilteredProfessionnels] = useState<
    Professionnel[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Configuration des filtres pour SearchFilters
  const filters = [
    {
      name: "categorie",
      label: "catégories",
      type: "select" as const,
      options: [
        { value: "all", label: "Toutes les catégories" },
        { value: "adulte", label: "Adultes" },
        { value: "tdah", label: "TDAH" },
      ],
      placeholder: "Filtrer par catégorie",
      defaultValue: "all",
    },
  ];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedPros, setExpandedPros] = useState<string[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3 colonnes x 3 lignes

  // Calcul de la pagination
  const totalPages = Math.ceil(filteredProfessionnels.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProfessionnels.slice(
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
        const response = await fetch("/db.json");
        if (!response.ok) throw new Error("Failed to fetch professionals");
        const data = await response.json();
        const professionnelsData = data.professionnels.map((pro: unknown) => {
          const p = pro as Record<string, unknown>;
          return {
            id: String(p.id),
            nom: String(p.nom),
            specialite: String(p.specialite),
            adresse: String(p.adresse),
            imageUrl: String(p.imageUrl),
            telephone: String(p.telephone),
            email: String(p.email),
            description: String(p.bio),
            verification: Boolean(p.verifiee),
            langues: Array.isArray(p.langues) ? p.langues.map(String) : [],
            diplome: String(p.diplome),
            experience: String(p.experience),
            tarif: String(p.tarif),
            creneauxDisponibles: Array.isArray(p.creneauxDisponibles)
              ? (p.creneauxDisponibles as { jour: string; heures: string[] }[])
              : [],
          };
        });
        setProfessionnels(professionnelsData);
        setFilteredProfessionnels(professionnelsData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchProfessionnels();
  }, []);

  useEffect(() => {
    let filtered = professionnels;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.specialite.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedFilter !== "all") {
      filtered = filtered.filter((p) => {
        const descLower = p.description.toLowerCase();
        const specLower = p.specialite.toLowerCase();
        if (selectedFilter === "adulte") {
          return descLower.includes("adulte") || specLower.includes("adulte");
        } else if (selectedFilter === "tdah") {
          return (
            descLower.includes("tdah") ||
            descLower.includes("neurodéveloppemental") ||
            specLower.includes("tdah")
          );
        }
        return true;
      });
    }

    setFilteredProfessionnels(filtered);
  }, [searchTerm, selectedFilter, professionnels]);

  // Gestion de la recherche
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset à la première page lors d'une nouvelle recherche
  }, []);

  // Gestion du changement de filtre
  const handleFilterChange = useCallback(
    (filterName: string, value: string | number) => {
      if (filterName === "categorie") {
        setSelectedFilter(value ? value.toString() : "all");
        setCurrentPage(1); // Reset à la première page lors d'un changement de filtre
      }
    },
    []
  );

  // Extract categories from description (simple keyword-based)
  const getCategories = (description: string) => {
    const lowerDesc = description.toLowerCase();
    const categories = [];
    if (lowerDesc.includes("thérapie") || lowerDesc.includes("tcc"))
      categories.push("Thérapie");
    if (lowerDesc.includes("consultation") || lowerDesc.includes("séance"))
      categories.push("Consultations");
    if (lowerDesc.includes("enfant") || lowerDesc.includes("adulte"))
      categories.push("Séances individuelles");
    if (categories.length === 0) categories.push("Consultations", "Thérapie");
    return categories.slice(0, 2); // Limit to 2 like image
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100">
        <div className="container mx-auto px-4 py-8">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8 animate-pulse"></div>
          <ProfileSkeletonList count={6} />
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
          {currentItems.map((pro: Professionnel) => {
            const categories = getCategories(pro.description);
            return (
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
                          <Briefcase className="w-5 h-5 text-gray-600" />
                          <span>{pro.experience}</span>
                        </div>

                        {/* Taux de satisfaction */}
                        <div className="flex items-center gap-2">
                          <ThumbsUp className="w-5 h-5 text-gray-600" />
                          <span>100%</span>
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
            );
          })}
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

        {filteredProfessionnels.length === 0 && (
          <p className="text-center text-gray-500 mt-12 text-lg">
            Aucun professionnel trouvé.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfessionalsList;
