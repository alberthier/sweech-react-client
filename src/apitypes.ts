// Types for /api/info

export type InfoStoragePath = {
    name: string,
    path: string,
    availableBytes: number,
    totalBytes: number
}

export type InfoShortcutDirectory = {
    exists: boolean,
    path: string
}

export type Info = {
    brand: string,
    model: string,
    hasSdCardWritePermission: boolean,
    premium: boolean,
    sdk: number,
    directories: {
        alarms: InfoShortcutDirectory,
        camera: InfoShortcutDirectory,
        documents: InfoShortcutDirectory,
        downloads: InfoShortcutDirectory,
        movies: InfoShortcutDirectory,
        music: InfoShortcutDirectory,
        notifications: InfoShortcutDirectory,
        pictures: InfoShortcutDirectory,
        podcasts: InfoShortcutDirectory,
        ringtones: InfoShortcutDirectory,
        [index:string]: InfoShortcutDirectory,
    },
    storagePaths: {
        internal: InfoStoragePath,
        externals: [ InfoStoragePath ],
    },
}

export type Ls = {
  content: [{
    isDir: boolean,
    isReadable: boolean,
    isWritable: boolean,
    mTime: number,
    mime: string,
    name: string,
    size: number,
  }],
  isDir: boolean,
  isReadable: boolean,
  isWritable: boolean,
  mTime: number,
  name: string,
  size: number,
}