import * as moment from 'moment';

interface I18n {
    ok: string,
    cancel: string,
    communicationError: string,
    items: string,
    fileBrowser: string,
    images: string,
    videos: string,
    music: string,
    root: string,
    internal: string,
    abort: string,
    uploadingFile: string,
    uploadingMultipleFiles(filesCount: number): string,
    newDirectory: string,
    name: string,
    deleteFile(filename: string): string,
    deleteMultipleFiles(filesCount: number): string,
    documents: string,
    packages: string,
    someNonDocumentFiles: string,
    someNonAudioFiles: string,
    someNonVideoFiles: string,
    someNonImageFiles: string,
    camera: string,
    downloads: string,
    movies: string,
    pictures: string,
    ringtones: string,
    premissionRequired: string,
    premissionRequiredMessage: string,
    clipboard: string,
    [index:string]: string|((...args: any[]) => string),
}

namespace Translations {
  export class en implements I18n {
    ok = "OK";
    cancel = "Cancel";
    communicationError = "Communication error";
    items = "items";
    fileBrowser = "File Browser";
    images = "Images";
    videos = "Videos";
    music = "Music";
    root = "System";
    internal = "Internal Storage";
    abort = "Abort";
    uploadingFile = "Transfering ${filename}";
    uploadingMultipleFiles = (filesCount: number) => `Transfering ${filesCount} files`;
    newDirectory = "New Folder";
    name = "Name";
    deleteFile = (filename: string) => `Delete ${filename} ?`;
    deleteMultipleFiles = (filesCount: number) => `Delete ${filesCount} files ?`;
    documents = "Documents";
    packages = "Apps";
    someNonDocumentFiles = "Non document files won't appear in the library";
    someNonAudioFiles = "Non audio files won't appear in the library";
    someNonVideoFiles = "Non video files won't appear in the library";
    someNonImageFiles = "Non image files won't appear in the library";
    camera = "Camera";
    downloads = "Downloads";
    movies = "Movies";
    pictures = "Pictures";
    ringtones = "Ringtones";
    premissionRequired = "Permission Required";
    premissionRequiredMessage = "You need to grant Sweech write access to your SD card. Open Sweech's preferences to configure write access.";
    clipboard = "Clipboard";
    [index:string]: string|((...args: any[]) => string);
  }

  export class fr implements I18n {
    ok = "OK";
    cancel = "Annuler";
    communicationError = "Erreur de communication";
    items = "items";
    fileBrowser = "Explorateur de Fichiers";
    images = "Images";
    videos = "Vidéos";
    music = "Musique";
    root = "Système";
    internal = "Stockage Interne";
    abort = "Annuler";
    uploadingFile = "Transfert de ${filename}";
    uploadingMultipleFiles = (filesCount: number) => `Transfert de ${filesCount} fichiers`;
    newDirectory = "Nouveau Dossier";
    name = "Nom";
    deleteFile = (filename: string) => `Supprimer ${filename} ?`;
    deleteMultipleFiles = (filesCount: number) => `Supprimer ${filesCount} fichiers ?`;
    documents = "Documents";
    packages = "Applications";
    someNonDocumentFiles = "Les fichiers qui ne sont pas des documents n'apparaîtront pas dans la bibliothèque";
    someNonAudioFiles = "Les fichiers non audio n'apparaîtront pas dans la bibliothèque";
    someNonVideoFiles = "Les fichiers non video n'apparaîtront pas dans la bibliothèque";
    someNonImageFiles = "Les fichiers qui ne sont pas des images n'apparaîtront pas dans la bibliothèque";
    camera = "Appareil Photo";
    downloads = "Téléchargements";
    movies = "Films";
    pictures = "Images";
    ringtones = "Sonneries";
    premissionRequired = "Permission Requise";
    premissionRequiredMessage = "Vous devez accorder à Sweech le droit d'écrire sur votre carte SD. Ouvrez les preferences de Sweech et autorisez l'application à écrire sur la carte SD.";
    clipboard = "Presse-papier";
    [index:string]: string|((...args: any[]) => string);
  }
  export class pt implements I18n {
    ok = "OK";
    cancel = "Cancelar";
    communicationError = "Erro de comunicação";
    items = "itens";
    fileBrowser = "Navegador de Ficheiros";
    images = "Imagens";
    videos = "Vídeos";
    music = "Música";
    root = "Sistema";
    internal = "Armazenamento Interno";
    abort = "Anular";
    uploadingFile = "A transferir ${filename}";
    uploadingMultipleFiles = (filesCount: number) => `A transferir os ficheiros ${filesCount}`;
    newDirectory = "Nova Pasta";
    name = "Nome";
    deleteFile = (filename: string) => `Apagar ${filename} ?`;
    deleteMultipleFiles = (filesCount: number) => `Apagar os ficheiros ${filesCount}?`;
    documents = "Documentos";
    packages = "Aplicações";
    someNonDocumentFiles = "Os ficheiros que não sejam do tipo documentos não aparecerão na biblioteca";
    someNonAudioFiles = "Os ficheiros que não sejam de áudio não aparecerão na biblioteca";
    someNonVideoFiles = "Os ficheiros que não sejam de vídeo não aparecerão na biblioteca";
    someNonImageFiles = "Os ficheiros que não sejam de imagens não aparecerão na biblioteca";
    camera = "Câmara";
    downloads = "Transferências";
    movies = "Filmes";
    pictures = "Imagens";
    ringtones = "Sons de toque";
    premissionRequired = "Permissão Necessária";
    premissionRequiredMessage = "Deve permitir que Sweech tenha acesso de escrita ao cartão SD. Abra as preferências de Sweech para configurar o acesso de escrita.";
    clipboard = "Prancheta";
    [index:string]: string|((...args: any[]) => string);
  }

  export class hu implements I18n {
    ok = "OK";
    cancel = "Mégsem";
    communicationError = "Kommunikációs hiba";
    items = "tétel";
    fileBrowser = "Fájl böngésző";
    images = "Képek";
    videos = "Videók";
    music = "Zene";
    root = "Rendszer";
    internal = "Belső tárhely";
    abort = "Leállít";
    uploadingFile = "${filename} átvitele";
    uploadingMultipleFiles = (filesCount: number) => `${filesCount} fájl átvitele`;
    newDirectory = "Új mappa";
    name = "Név";
    deleteFile = (filename: string) => `${filename} törlése ?`;
    deleteMultipleFiles = (filesCount: number) => `${filesCount} fájlok törlése ?`;
    documents = "Dokumentumok";
    packages = "Alkalmazások";
    someNonDocumentFiles = "Csak dokumentumok fognak megjelenni a könyvtárban";
    someNonAudioFiles = "Csak hangfájlok fognak megjelenni a könyvtárban";
    someNonVideoFiles = "Csak videó fájlok fognak megjelenni a könyvtárban";
    someNonImageFiles = "Csak kép fájlok fognak megjelenni a könyvtárban";
    camera = "Kamera";
    downloads = "Letöltések";
    movies = "Filmek";
    pictures = "Képek";
    ringtones = "Csengőhangok";
    premissionRequired = "Engedély szükséges";
    premissionRequiredMessage = "Engedélyeznie kell a Sweechnek az SD kártya írását. Nyissa meg a Sweech beállításait és állítsa be a hozzáférést.";
    clipboard = "Vágólap";
    [index:string]: string|((...args: any[]) => string);
  }
}

function setup(): I18n {
  const lang = window.navigator.language.substr(0, 2);
  const translation = (Translations as any)[lang] || Translations.en;
  moment.locale(lang);
  return new translation();
}

export default setup();
