// Types for /api/info

export type StoragePathInfo = {
    name: string,
    path: string,
    availableBytes: number,
    totalBytes: number
}

export type ShortcutDirectoryInfo = {
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
        alarms: ShortcutDirectoryInfo,
        camera: ShortcutDirectoryInfo,
        documents: ShortcutDirectoryInfo,
        downloads: ShortcutDirectoryInfo,
        movies: ShortcutDirectoryInfo,
        music: ShortcutDirectoryInfo,
        notifications: ShortcutDirectoryInfo,
        pictures: ShortcutDirectoryInfo,
        podcasts: ShortcutDirectoryInfo,
        ringtones: ShortcutDirectoryInfo,
        [index:string]: ShortcutDirectoryInfo,
    },
    storagePaths: {
        internal: StoragePathInfo,
        externals: [ StoragePathInfo ],
    },
}
