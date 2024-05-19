export default function useLocalDatabase() {
    const openRequest = indexedDB.open('scan-guard', 1)

    const db = ref<IDBDatabase | null>(null)

    openRequest.onupgradeneeded = function () {
        const db = openRequest.result
        db.createObjectStore('requests', { keyPath: 'id' })
    }

    openRequest.onsuccess = function () {
        db.value = openRequest.result
    }

    const getRequestStore = function (): IDBObjectStore | null {
        return db.value ? db.value.transaction('requests', 'readwrite').objectStore('requests') : null
    }

    return {
        db,
        getRequestStore,
    }
}
