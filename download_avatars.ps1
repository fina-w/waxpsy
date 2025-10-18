# Script pour télécharger des avatars depuis Flaticon
$avatars = @(
    @{id="219/219983"; name="avatar1.png"},
    @{id="1946/1946429"; name="avatar2.png"},
    @{id="1946/1946425"; name="avatar3.png"},
    @{id="1946/1946423"; name="avatar4.png"},
    @{id="1946/1946422"; name="avatar5.png"},
    @{id="1946/1946421"; name="avatar6.png"},
    @{id="1946/1946420"; name="avatar7.png"},
    @{id="1946/1946419"; name="avatar8.png"}
)

# Créer le dossier avatars s'il n'existe pas
if (-not (Test-Path -Path "public/avatars")) {
    New-Item -ItemType Directory -Path "public/avatars" -Force
}

# Télécharger chaque avatar
foreach ($avatar in $avatars) {
    $url = "https://cdn-icons-png.flaticon.com/512/$($avatar.id).png"
    $output = "public/avatars/$($avatar.name)"
    
    Write-Host "Téléchargement de $url vers $output"
    Invoke-WebRequest -Uri $url -OutFile $output
}

Write-Host "Tous les avatars ont été téléchargés avec succès !"
