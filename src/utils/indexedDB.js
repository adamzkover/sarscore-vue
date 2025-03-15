const DB_NAME = 'SaarScoreDB';
const DB_VERSION = 1;
const STORE_NAME = 'patients';

import Patient from '@/models/Patient';

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

function getPatient(id) {
    return openDB().then((db) => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(id);

            request.onsuccess = (event) => {
                resolve(event.target.result);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    });
}

function addPatient(patient) {
    return openDB().then((db) => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.add(patient);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    });
}

function savePatient(patient) {
    return openDB().then((db) => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.put(patient);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    });
}

async function initializePatient(patientId = '27115743487', patientName = 'Tore Hjemmekjær') {
    try {
        const patient = await getPatient(patientId);
        if (!patient) {
            const newPatient = new Patient(patientId, patientName, {});
            await addPatient(newPatient);
            console.log('Patient created:', newPatient);
        } else {
            console.log('Patient already exists:', patient);
        }
    } catch (error) {
        console.error('Error initializing patient:', error);
    }
}

function deletePatient(id) {
    return openDB().then((db) => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(id);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    });
}

export { getPatient, addPatient, savePatient, initializePatient, deletePatient };
